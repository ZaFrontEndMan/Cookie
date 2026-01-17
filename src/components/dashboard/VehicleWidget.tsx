import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const VehicleWidget = () => {
    const { t } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("dashboard.vehicles.title")}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {t("dashboard.vehicles.description")}
                </p>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-4xl font-bold mb-2">29</h3>
                        <p className="text-sm text-green-600 font-medium">
                            +3.85% {t("dashboard.vehicles.weeklyChange")}
                        </p>
                    </div>
                    <div className="relative">
                        <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                            <Truck className="h-12 w-12 text-muted-foreground" />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <div className="w-2 h-2 rounded-full bg-green-500 me-2" />
                        {t("dashboard.vehicles.onRoute")}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};
