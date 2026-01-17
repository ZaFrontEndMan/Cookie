import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaCookieBite, FaStar } from "react-icons/fa";
import { Flex } from "@/components/ui/flex";
import { PageHeader } from "@/components/common/PageHeader";

const ButtonsPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      {/* Header */}
      <PageHeader
        title={t("pages.components.buttons.header.title")}
        description={t("pages.components.buttons.header.description")}
      />

      <Flex direction="col" gap={6}>
        {/* Variants Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("pages.components.buttons.variants.title")}
            </CardTitle>
            <CardDescription>
              {t("pages.components.buttons.variants.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex direction="row" gap={2} wrap="wrap">
              <Button color="primary" variant="filled">
                {t("pages.components.buttons.variants.filled")}
              </Button>
              <Button color="primary" variant="outline">
                {t("pages.components.buttons.variants.outline")}
              </Button>
              <Button color="primary" variant="ghost">
                {t("pages.components.buttons.variants.ghost")}
              </Button>
              <Button color="primary" variant="link">
                {t("pages.components.buttons.variants.link")}
              </Button>
            </Flex>
          </CardContent>
        </Card>

        {/* Colors Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.buttons.colors.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.buttons.colors.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex direction="row" gap={2} wrap="wrap">
              <Button color="primary" variant="filled">
                {t("pages.components.buttons.colors.primary")}
              </Button>
              <Button color="secondary" variant="filled">
                {t("pages.components.buttons.colors.secondary")}
              </Button>
              <Button color="danger" variant="filled">
                {t("pages.components.buttons.colors.danger")}
              </Button>
              <Button color="warning" variant="filled">
                {t("pages.components.buttons.colors.warning")}
              </Button>
              <Button color="success" variant="filled">
                {t("pages.components.buttons.colors.success")}
              </Button>
            </Flex>
          </CardContent>
        </Card>

        {/* Sizes Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.buttons.sizes.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.buttons.sizes.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex wrap="wrap" gap={4} align="center">
              <Button color="primary" variant="filled" size="sm">
                {t("pages.components.buttons.sizes.small")}
              </Button>
              <Button color="primary" variant="outline" size="sm">
                {t("pages.components.buttons.sizes.small")}
              </Button>
              <Button color="primary" variant="filled" size="default">
                {t("pages.components.buttons.sizes.default")}
              </Button>
              <Button color="primary" variant="outline" size="default">
                {t("pages.components.buttons.sizes.default")}
              </Button>
              <Button color="primary" variant="filled" size="lg">
                {t("pages.components.buttons.sizes.large")}
              </Button>
              <Button color="primary" variant="outline" size="lg">
                {t("pages.components.buttons.sizes.large")}
              </Button>
              <Button color="primary" variant="filled" size="icon">
                <FaCookieBite className="w-5 h-5" />
              </Button>
              <Button color="primary" variant="outline" size="icon">
                <FaCookieBite className="w-5 h-5" />
              </Button>
            </Flex>
          </CardContent>
        </Card>

        {/* Tooltips with Icons Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("pages.components.buttons.tooltips.title")}
            </CardTitle>
            <CardDescription>
              {t("pages.components.buttons.tooltips.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex wrap="wrap" gap={4}>
              <Button
                color="primary"
                variant="filled"
                tooltip={t("pages.components.buttons.tooltips.top")}
                tooltipPosition="top"
              >
                <FaCookieBite className="w-5 h-5 me-2" />
                {t("pages.components.buttons.tooltips.button")}
              </Button>
              <Button
                color="primary"
                variant="outline"
                tooltip={t("pages.components.buttons.tooltips.bottom")}
                tooltipPosition="bottom"
              >
                <FaCookieBite className="w-5 h-5 me-2" />
                {t("pages.components.buttons.tooltips.button")}
              </Button>
              <Button
                color="success"
                variant="filled"
                tooltip={t("pages.components.buttons.tooltips.left")}
                tooltipPosition="left"
              >
                <FaStar className="w-5 h-5 me-2" />
                {t("pages.components.buttons.tooltips.button")}
              </Button>
              <Button
                color="success"
                variant="outline"
                tooltip={t("pages.components.buttons.tooltips.right")}
                tooltipPosition="right"
              >
                <FaStar className="w-5 h-5 me-2" />
                {t("pages.components.buttons.tooltips.button")}
              </Button>
            </Flex>
          </CardContent>
        </Card>
      </Flex>
    </motion.div>
  );
};

export default ButtonsPage;
