
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const AlertsPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.alerts.title")}
        description={t("pages.components.alerts.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.alerts.alertVariants")}</CardTitle>
            <CardDescription>
              {t("pages.components.alerts.alertVariantsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>{t("pages.components.alerts.infoTitle")}</AlertTitle>
              <AlertDescription>
                {t("pages.components.alerts.infoDescription")}
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("pages.components.alerts.errorTitle")}</AlertTitle>
              <AlertDescription>
                {t("pages.components.alerts.errorDescription")}
              </AlertDescription>
            </Alert>

            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>{t("pages.components.alerts.successTitle")}</AlertTitle>
              <AlertDescription>
                {t("pages.components.alerts.successDescription")}
              </AlertDescription>
            </Alert>

            <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t("pages.components.alerts.warningTitle")}</AlertTitle>
              <AlertDescription>
                {t("pages.components.alerts.warningDescription")}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.alerts.simpleAlerts")}</CardTitle>
            <CardDescription>
              {t("pages.components.alerts.simpleAlertsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                {t("pages.components.alerts.simpleInfo")}
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertDescription>
                {t("pages.components.alerts.simpleError")}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AlertsPage;
