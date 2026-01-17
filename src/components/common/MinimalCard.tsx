import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Theme = "primary" | "secondary";

interface MinimalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  theme?: Theme; // <-- new prop
}

const MinimalCard: React.FC<MinimalCardProps> = ({
  title,
  description,
  footer,
  children,
  className,
  theme = "primary",
  ...props
}) => {
  const { fromColor, viaColor, toColor } = {
    primary: {
      fromColor: "from-primary/10",
      viaColor: "via-primary/20",
      toColor: "to-primary/5",
    },
    secondary: {
      fromColor: "from-secondary/10",
      viaColor: "via-secondary/20",
      toColor: "to-secondary/5",
    },
  }[theme];

  const lines = Array.from({ length: 500 }, () => ({
    top: `${Math.random() * 100}%`,
    rotate: 10 + Math.random() * 50,
    opacity: 0.1 + Math.random() * 0.6,
    from: fromColor,
    via: viaColor,
    to: toColor,
  }));

  return (
    <Card
      className={cn("relative overflow-hidden border-none", className)}
      {...props}
    >
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      {children && (
        <CardContent className="pt-0 relative z-10">{children}</CardContent>
      )}

      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}

      {lines.map((line, i) => (
        <div
          key={i}
          className={cn(
            "pointer-events-none absolute h-px w-[200%] bg-gradient-to-l",
            line.from,
            line.via,
            line.to
          )}
          style={{
            top: line.top,
            left: "-50%",
            transform: `rotate(${line.rotate}deg)`,
            opacity: line.opacity,
            transformOrigin: "center",
          }}
        />
      ))}
    </Card>
  );
};

export default MinimalCard;
