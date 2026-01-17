import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Truck, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const trackingSteps = [
    {
        icon: Package,
        labelKey: "dashboard.tracking.pickedUp",
        date: "12 Apr 2028",
        time: "12:54",
        status: "completed",
    },
    {
        icon: Truck,
        labelKey: "dashboard.tracking.inTransit",
        date: "12 Apr 2028",
        time: "12:58",
        status: "active",
    },
    {
        icon: CheckCircle2,
        labelKey: "dashboard.tracking.delivered",
        date: "13 Apr 2028",
        time: "--:--",
        status: "pending",
    },
];

export const TrackingWidget = () => {
    const { t } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("dashboard.tracking.title")}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {t("dashboard.tracking.description")}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Map Placeholder */}
                <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-12 w-12 text-primary" />
                    </div>
                    <div className="absolute top-2 right-2">
                        <Button variant="outline" size="sm" className="bg-background">
                            {t("dashboard.tracking.viewLargerMap")}
                        </Button>
                    </div>
                </div>

                {/* Tracking ID */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">{t("dashboard.tracking.trackingId")}</p>
                        <p className="font-semibold">#28745-72809bjk</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {t("dashboard.tracking.inTransit")}
                    </Badge>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    {trackingSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`p-2 rounded-full ${step.status === "completed"
                                                ? "bg-green-100 text-green-600"
                                                : step.status === "active"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    {index < trackingSteps.length - 1 && (
                                        <div className="w-0.5 h-8 bg-border" />
                                    )}
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-medium">{t(step.labelKey)}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {step.date} • {step.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Courier Info */}
                <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>DW</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{t("dashboard.tracking.courier")}</p>
                            <p className="text-sm text-muted-foreground">David Walthen</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
