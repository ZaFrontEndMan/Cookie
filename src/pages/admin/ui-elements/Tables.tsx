
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const TablesPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.tables.title")}
        description={t("pages.components.tables.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.tables.examples.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.tables.examples.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t("pages.components.tables.examples.header.name")}
                  </TableHead>
                  <TableHead>
                    {t("pages.components.tables.examples.header.email")}
                  </TableHead>
                  <TableHead>
                    {t("pages.components.tables.examples.header.role")}
                  </TableHead>
                  <TableHead>
                    {t("pages.components.tables.examples.header.status")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {t("pages.components.tables.examples.data.name1")}
                  </TableCell>
                  <TableCell>
                    {t("pages.components.tables.examples.data.email1")}
                  </TableCell>
                  <TableCell>
                    {t("pages.components.tables.examples.data.role1")}
                  </TableCell>
                  <TableCell>
                    {t("pages.components.tables.examples.data.status1")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t("pages.components.tables.examples.data.name2")}
                  </TableCell>
                  <TableCell>
                    {t("pages.components.tables.examples.data.email2")}
                  </TableCell>
                  <TableCell>
                    {t("pages.components.tables.examples.data.role2")}
                  </TableCell>
                  <TableCell>
                    {t("pages.components.tables.examples.data.status2")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TablesPage;
