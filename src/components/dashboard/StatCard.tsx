import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    trend?: "up" | "down";
    trendValue?: string;
    iconColor?: string;
}

export const StatCard = ({
    icon: Icon,
    value,
    label,
    trend,
    trendValue,
    iconColor = "text-primary",
}: StatCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                                {label}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold">{value}</h3>
                                {trendValue && (
                                    <span
                                        className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {trend === "up" ? "+" : "-"}
                                        {trendValue}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg bg-muted ${iconColor}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
