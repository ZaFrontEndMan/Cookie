import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const CardsPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.cards.title")}
        description={t("pages.components.cards.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.cards.examples.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.cards.examples.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("pages.components.cards.examples.basic.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("pages.components.cards.examples.basic.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{t("pages.components.cards.examples.basic.content")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("pages.components.cards.examples.interactive.title")}
                  </CardTitle>
                  <CardDescription>
                    {t(
                      "pages.components.cards.examples.interactive.description"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {t("pages.components.cards.examples.interactive.content")}
                  </p>
                  <Button>
                    {t(
                      "pages.components.cards.examples.interactive.action_button"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default CardsPage;
