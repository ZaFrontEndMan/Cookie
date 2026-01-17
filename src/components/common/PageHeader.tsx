import { Flex } from "@/components/ui/flex";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <Flex justify="between" align="start" className="mb-8">
      <Flex direction="col" gap={2}>
        <Heading size="3xl" weight="bold">
          {title}
        </Heading>
        {description && <Text variant="muted">{description}</Text>}
      </Flex>
      {actions && <Flex className="flex-shrink-0">{actions}</Flex>}
    </Flex>
  );
};

