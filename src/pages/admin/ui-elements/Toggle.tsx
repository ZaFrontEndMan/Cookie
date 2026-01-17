import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

const TogglePage = () => {
  const { t } = useLanguage();
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.toggle.title")}
        description={t("pages.components.toggle.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.toggle.examples.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.toggle.examples.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch checked={isToggled} onCheckedChange={setIsToggled} />
              <div>
                <label className="block text-sm font-medium">
                  {t("pages.components.toggle.examples.default.label")}
                </label>
                <p className="text-sm text-muted-foreground">
                  {t("pages.components.toggle.examples.default.description")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Switch disabled />
              <div>
                <label className="block text-sm font-medium">
                  {t("pages.components.toggle.examples.disabled.label")}
                </label>
                <p className="text-sm text-muted-foreground">
                  {t("pages.components.toggle.examples.disabled.description")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TogglePage;
