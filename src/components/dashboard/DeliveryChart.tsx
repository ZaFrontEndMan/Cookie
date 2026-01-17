import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const monthlyData = [
    { month: "Jan", shipment: 90, delivery: 80 },
    { month: "Feb", shipment: 60, delivery: 75 },
    { month: "Mar", shipment: 75, delivery: 65 },
    { month: "Apr", shipment: 45, delivery: 55 },
    { month: "May", shipment: 85, delivery: 75 },
    { month: "Jun", shipment: 65, delivery: 70 },
    { month: "Jul", shipment: 75, delivery: 80 },
    { month: "Aug", shipment: 95, delivery: 85 },
    { month: "Sep", shipment: 55, delivery: 65 },
    { month: "Oct", shipment: 75, delivery: 85 },
    { month: "Nov", shipment: 85, delivery: 90 },
    { month: "Dec", shipment: 80, delivery: 85 },
];

const chartConfig = {
    shipment: {
        label: "Shipment",
        color: "hsl(var(--primary))",
    },
    delivery: {
        label: "Delivery",
        color: "hsl(var(--primary) / 0.5)",
    },
};

export const DeliveryChart = () => {
    const [period, setPeriod] = useState("monthly");
    const { t } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>{t("dashboard.deliveryStatistics.title")}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {t("dashboard.deliveryStatistics.description")} 70.5K
                        </p>
                    </div>
                    <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monthly">{t("dashboard.deliveryStatistics.monthly")}</SelectItem>
                            <SelectItem value="yearly">{t("dashboard.deliveryStatistics.yearly")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{t("dashboard.deliveryStatistics.shipment")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/50" />
                        <span className="text-muted-foreground">{t("dashboard.deliveryStatistics.delivery")}</span>
                    </div>
                </div>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="shipment" fill="var(--color-shipment)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="delivery" fill="var(--color-delivery)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <p className="text-sm text-muted-foreground">{t("dashboard.deliveryStatistics.totalRevenue")}</p>
                        <p className="text-2xl font-bold">$23,445,700</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{t("dashboard.deliveryStatistics.shippedQuantities")}</p>
                        <p className="text-2xl font-bold">9,258</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
