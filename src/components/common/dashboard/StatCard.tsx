import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Flex } from "@/components/ui/flex";
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@/utils/badgeUtils";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  percentageChange: number;
  t: (key: string) => string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  percentageChange,
  t,
}) => {
  return (
    <Card className="w-full h-full max-h-36">
      <CardHeader>
        <Flex direction="row" align="center" gap={3}>
          {Icon && (
            <Badge size="2" radius="medium" variant="outline">
              <Icon className="w-6 h-6 text-primary" />
            </Badge>
          )}
          <CardTitle>{t(title)}</CardTitle>
        </Flex>
      </CardHeader>
      <CardContent>
        <Flex direction="row" justify="between" align="center" gap={1}>
          <Text size="2xl" weight="bold">
            {value}
          </Text>
          <Badge color={getBadgeColor(percentageChange)}>
            {percentageChange >= 0
              ? `+${percentageChange}% ↝`
              : `${percentageChange}% ↯`}
          </Badge>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default StatCard;
