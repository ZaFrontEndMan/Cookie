import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const InputsPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.inputs.title")}
        description={t("pages.components.inputs.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.inputs.examples.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.inputs.examples.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.inputs.examples.text.label")}
                  </label>
                  <Input
                    type="text"
                    placeholder={t(
                      "pages.components.inputs.examples.text.placeholder"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.inputs.examples.email.label")}
                  </label>
                  <Input
                    type="email"
                    placeholder={t(
                      "pages.components.inputs.examples.email.placeholder"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.inputs.examples.password.label")}
                  </label>
                  <Input
                    type="password"
                    placeholder={t(
                      "pages.components.inputs.examples.password.placeholder"
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.inputs.examples.number.label")}
                  </label>
                  <Input
                    type="number"
                    placeholder={t(
                      "pages.components.inputs.examples.number.placeholder"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.inputs.examples.search.label")}
                  </label>
                  <Input
                    type="search"
                    placeholder={t(
                      "pages.components.inputs.examples.search.placeholder"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.inputs.examples.disabled.label")}
                  </label>
                  <Input
                    type="text"
                    placeholder={t(
                      "pages.components.inputs.examples.disabled.placeholder"
                    )}
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default InputsPage;
