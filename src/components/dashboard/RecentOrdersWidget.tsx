import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface Order {
    id: string;
    product: string;
    variants: string;
    category: string;
    price: string;
    status: "delivered" | "pending" | "canceled";
}

const orders: Order[] = [
    {
        id: "1",
        product: "Macbook pro 13\"",
        variants: "3",
        category: "Laptop",
        price: "$2399.00",
        status: "delivered",
    },
    {
        id: "2",
        product: "Apple Watch Ultra",
        variants: "1",
        category: "Watch",
        price: "$879.00",
        status: "pending",
    },
    {
        id: "3",
        product: "iPhone 15 Pro Max",
        variants: "2",
        category: "SmartPhone",
        price: "$1849.00",
        status: "delivered",
    },
    {
        id: "4",
        product: "iPad Pro 3rd Gen",
        variants: "2",
        category: "Electronics",
        price: "$1699.00",
        status: "canceled",
    },
    {
        id: "5",
        product: "Airpods Pro 2nd Gen",
        variants: "1",
        category: "Accessories",
        price: "$240.00",
        status: "delivered",
    },
];

const statusColors = {
    delivered: "bg-green-100 text-green-700 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    canceled: "bg-red-100 text-red-700 hover:bg-red-100",
};

export const RecentOrdersWidget = () => {
    const { t } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{t("dashboard.recentOrders.title")}</CardTitle>
                    <Button variant="link" size="sm">
                        {t("dashboard.recentOrders.seeAll")}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center justify-between py-3 border-b last:border-0"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                    <span className="text-xs font-medium text-muted-foreground">
                                        IMG
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{order.product}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {order.variants} {t("dashboard.recentOrders.variants")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground min-w-[80px]">
                                    {order.category}
                                </span>
                                <span className="text-sm font-medium min-w-[80px]">
                                    {order.price}
                                </span>
                                <Badge variant="outline" className={`min-w-[80px] justify-center ${statusColors[order.status]}`}>
                                    {t(`dashboard.activities.${order.status}`)}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
