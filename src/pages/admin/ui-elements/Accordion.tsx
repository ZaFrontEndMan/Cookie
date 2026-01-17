
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const AccordionPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.accordion.title")}
        description={t("pages.components.accordion.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.accordion.faqAccordion")}</CardTitle>
            <CardDescription>
              {t("pages.components.accordion.faqAccordionDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("pages.components.accordion.returnPolicyQuestion")}</AccordionTrigger>
                <AccordionContent>
                  {t("pages.components.accordion.returnPolicyAnswer")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("pages.components.accordion.shippingQuestion")}</AccordionTrigger>
                <AccordionContent>
                  {t("pages.components.accordion.shippingAnswer")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("pages.components.accordion.internationalShippingQuestion")}</AccordionTrigger>
                <AccordionContent>
                  {t("pages.components.accordion.internationalShippingAnswer")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.accordion.singleSelection")}</CardTitle>
            <CardDescription>
              {t("pages.components.accordion.singleSelectionDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("pages.components.accordion.gettingStarted")}</AccordionTrigger>
                <AccordionContent>
                  {t("pages.components.accordion.gettingStartedContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("pages.components.accordion.advancedFeatures")}</AccordionTrigger>
                <AccordionContent>
                  {t("pages.components.accordion.advancedFeaturesContent")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("pages.components.accordion.troubleshooting")}</AccordionTrigger>
                <AccordionContent>
                  {t("pages.components.accordion.troubleshootingContent")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AccordionPage;
