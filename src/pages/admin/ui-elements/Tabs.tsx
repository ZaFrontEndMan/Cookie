
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const TabsPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.tabs.title")}
        description={t("pages.components.tabs.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.tabs.examples.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.tabs.examples.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">
                  {t("pages.components.tabs.examples.tab1.title")}
                </TabsTrigger>
                <TabsTrigger value="tab2">
                  {t("pages.components.tabs.examples.tab2.title")}
                </TabsTrigger>
                <TabsTrigger value="tab3">
                  {t("pages.components.tabs.examples.tab3.title")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p>{t("pages.components.tabs.examples.tab1.content")}</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p>{t("pages.components.tabs.examples.tab2.content")}</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p>{t("pages.components.tabs.examples.tab3.content")}</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TabsPage;
