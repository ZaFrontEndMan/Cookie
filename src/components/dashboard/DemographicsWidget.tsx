import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const countries = [
    { name: "USA", customers: "2,379", percentage: 79 },
    { name: "France", customers: "987", percentage: 23 },
    { name: "Germany", customers: "1,234", percentage: 45 },
    { name: "Japan", customers: "856", percentage: 35 },
];

export const DemographicsWidget = () => {
    const { t } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("dashboard.demographics.title")}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {t("dashboard.demographics.description")}
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Map Placeholder */}
                <div className="relative h-48 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <Globe className="h-24 w-24 text-muted-foreground opacity-20" />
                </div>

                {/* Country List */}
                <div className="space-y-4">
                    {countries.map((country) => (
                        <div key={country.name} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{country.name}</span>
                                <span className="text-muted-foreground">{country.percentage}%</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Progress value={country.percentage} className="flex-1" />
                                <span className="text-xs text-muted-foreground min-w-[100px]">
                                    {country.customers} {t("dashboard.demographics.customers")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
