
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Product } from "@/utils/localStorageApi";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onSubmit, 
  isLoading 
}: ProductModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product 
              ? "Update the product details below" 
              : "Fill in the product details to add a new item to your inventory"
            }
          </DialogDescription>
        </DialogHeader>
        
        <ProductForm
          product={product}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
