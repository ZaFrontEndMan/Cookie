import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flex } from "@/components/ui/flex";
import { Text } from "@/components/ui/text";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const BadgesPage = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.badges.title")}
        description={t("pages.components.badges.description")}
      />

      <Flex direction="col" gap={6}>
        <Card>
          <CardHeader>
            <CardTitle>
              <Text size="lg" weight="semibold">
                {t("pages.components.badges.badgeSizes")}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted">
                {t("pages.components.badges.badgeSizesDescription")}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex gap={4} wrap="wrap" align="center">
              <Badge size="1">1: Small</Badge>
              <Badge size="2">2: Medium</Badge>
              <Badge size="3">3: Large</Badge>
            </Flex>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text size="lg" weight="semibold">
                {t("pages.components.badges.badgeVariants")}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted">
                {t("pages.components.badges.badgeVariantsDescription")}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex gap={4} wrap="wrap">
              <Badge variant="solid">Solid</Badge>
              <Badge variant="soft">Soft</Badge>
              <Badge variant="surface">Surface</Badge>
              <Badge variant="outline">Outline</Badge>
            </Flex>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text size="lg" weight="semibold">
                {t("pages.components.badges.badgeColors")}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted">
                {t("pages.components.badges.badgeColorsDescription")}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex gap={4} wrap="wrap">
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="danger">Danger</Badge>
            </Flex>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text size="lg" weight="semibold">
                {t("pages.components.badges.highContrastBadges")}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted">
                {t("pages.components.badges.highContrastBadgesDescription")}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex gap={4} wrap="wrap">
              <Badge highContrast={true} color="success">
                {t("pages.components.badges.highContrastSuccess")}
              </Badge>
              <Badge highContrast={true} color="warning">
                {t("pages.components.badges.highContrastWarning")}
              </Badge>
              <Badge highContrast={true} color="danger">
                {t("pages.components.badges.highContrastDanger")}
              </Badge>
              <Badge highContrast={false} color="success">
                {t("pages.components.badges.normalContrast")}
              </Badge>
            </Flex>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text size="lg" weight="semibold">
                {t("pages.components.badges.badgeRadius")}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted">
                {t("pages.components.badges.badgeRadiusDescription")}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex gap={4} wrap="wrap">
              <Badge radius="none">{t("pages.components.badges.noRadius")}</Badge>
              <Badge radius="small">{t("pages.components.badges.smallRadius")}</Badge>
              <Badge radius="medium">{t("pages.components.badges.mediumRadius")}</Badge>
              <Badge radius="large">{t("pages.components.badges.largeRadius")}</Badge>
              <Badge radius="full">{t("pages.components.badges.fullRadius")}</Badge>
            </Flex>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Text size="lg" weight="semibold">
                {t("pages.components.badges.badgeExamples")}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text size="sm" variant="muted">
                {t("pages.components.badges.badgeExamplesDescription")}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Flex direction="col" gap={4}>
              <Flex gap={2} align="center">
                <Text size="base">John Doe</Text>
                <Badge variant="outline" size="2">
                  {t("pages.components.badges.admin")}
                </Badge>
              </Flex>
              <Flex gap={2} align="center">
                <Text size="base">Project Alpha</Text>
                <Badge color="success" size="1">
                  {t("pages.components.badges.completed")}
                </Badge>
              </Flex>
              <Flex gap={2} align="center">
                <Text size="base">API Status</Text>
                <Badge color="success" size="1">
                  {t("pages.components.badges.online")}
                </Badge>
                <Badge variant="soft" size="1">
                  v2.1.0
                </Badge>
              </Flex>
              <Flex gap={2} align="center">
                <Text size="base">{t("pages.components.badges.notifications")}</Text>
                <Badge variant="surface" size="2">
                  3
                </Badge>
              </Flex>
            </Flex>
          </CardContent>
        </Card>
      </Flex>
    </motion.div>
  );
};

export default BadgesPage;
