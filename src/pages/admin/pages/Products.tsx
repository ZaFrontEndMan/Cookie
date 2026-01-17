
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/hooks/useProducts";
import { ProductModal } from "@/components/products/ProductModal";
import { Product } from "@/utils/localStorageApi";
import { Flex } from "@/components/ui/flex";
import { Edit2, Trash2, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

const Products = () => {
  const { t } = useLanguage();
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm(t("pages.products.deleteConfirm"))) {
      await deleteProduct(id);
    }
  };

  const handleModalSubmit = async (data: any) => {
    const productData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      stock: Number(data.stock),
      status: data.status,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await createProduct(productData);
    }
    
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.products.title")}
        description={t("pages.products.productList")}
        actions={
          <Button onClick={handleAddProduct}>
            <Plus className="w-4 h-4 me-2" />
            {t("pages.products.addProduct")}
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{t("pages.products.productList")}</CardTitle>
          <CardDescription>
            {t("pages.products.manageInventory")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">{t("pages.products.loadingProducts")}</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("pages.products.productName")}</TableHead>
                    <TableHead>{t("pages.products.category")}</TableHead>
                    <TableHead>{t("pages.products.price")}</TableHead>
                    <TableHead>{t("pages.products.stock")}</TableHead>
                    <TableHead>{t("pages.products.status")}</TableHead>
                    <TableHead>{t("pages.products.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {t("pages.products.noProductsMessage")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === "active" ? "solid" : "soft"}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Flex className="gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              color="danger"
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </Flex>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={editingProduct}
        onSubmit={handleModalSubmit}
        isLoading={isLoading}
      />
    </motion.div>
  );
};

export default Products;
