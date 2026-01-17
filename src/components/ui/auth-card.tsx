import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AuthCard = ({
  title,
  description,
  children,
  className,
}: AuthCardProps) => {
  const lines = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      key: i,
      top: Math.random() * 100,
      rotation: 5 + Math.random() * 40,
      width: 150 + Math.random() * 200,
    }));
  }, []);

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-4", className)}>
      {/* Background Lines - Same as Layout */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bg-gradient-to-br from-env-deep-teal/5 via-primary/8 to-secondary/12 h-full w-full">
          <div className="absolute inset-0">
            {lines.map((line) => (
              <div
                key={line.key}
                className="absolute h-px bg-gradient-to-l from-primary/50 via-secondary/30 to-primary-foreground/15"
                style={{
                  width: `${line.width}%`,
                  top: `${line.top}%`,
                  left: "-50%",
                  transform: `rotate(${line.rotation}deg)`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Auth Card */}
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
