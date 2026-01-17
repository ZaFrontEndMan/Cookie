import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type DeliveryStatus = "delivered" | "in-transit" | "pending" | "processing";

interface Activity {
    orderId: string;
    category: string;
    company: string;
    arrivalTime: string;
    route: string;
    price: string;
    status: DeliveryStatus;
}

const activities: Activity[] = [
    {
        orderId: "#28745",
        category: "Electronics",
        company: "Tech Corp",
        arrivalTime: "2:30 PM",
        route: "Route A",
        price: "$2,399.00",
        status: "delivered",
    },
    {
        orderId: "#28746",
        category: "Fashion",
        company: "Style Co",
        arrivalTime: "4:15 PM",
        route: "Route B",
        price: "$879.00",
        status: "in-transit",
    },
    {
        orderId: "#28747",
        category: "Home",
        company: "Home Plus",
        arrivalTime: "10:00 AM",
        route: "Route C",
        price: "$1,249.00",
        status: "pending",
    },
    {
        orderId: "#28748",
        category: "Sports",
        company: "Active Gear",
        arrivalTime: "1:45 PM",
        route: "Route A",
        price: "$549.00",
        status: "processing",
    },
    {
        orderId: "#28749",
        category: "Books",
        company: "Read More",
        arrivalTime: "3:20 PM",
        route: "Route D",
        price: "$89.00",
        status: "delivered",
    },
];

const statusColors: Record<DeliveryStatus, string> = {
    delivered: "bg-green-100 text-green-700 hover:bg-green-100",
    "in-transit": "bg-blue-100 text-blue-700 hover:bg-blue-100",
    pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    processing: "bg-purple-100 text-purple-700 hover:bg-purple-100",
};

export const ActivitiesTable = () => {
    const [filter, setFilter] = useState<"all" | DeliveryStatus>("all");
    const { t } = useLanguage();

    const filteredActivities =
        filter === "all"
            ? activities
            : activities.filter((a) => a.status === filter);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{t("dashboard.activities.title")}</CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant={filter === "all" ? "filled" : "outline"}
                            size="sm"
                            onClick={() => setFilter("all")}
                        >
                            {t("dashboard.activities.all")}
                        </Button>
                        <Button
                            variant={filter === "delivered" ? "filled" : "outline"}
                            size="sm"
                            onClick={() => setFilter("delivered")}
                        >
                            {t("dashboard.activities.delivered")}
                        </Button>
                        <Button
                            variant={filter === "in-transit" ? "filled" : "outline"}
                            size="sm"
                            onClick={() => setFilter("in-transit")}
                        >
                            {t("dashboard.activities.inTransit")}
                        </Button>
                        <Button
                            variant={filter === "pending" ? "filled" : "outline"}
                            size="sm"
                            onClick={() => setFilter("pending")}
                        >
                            {t("dashboard.activities.pending")}
                        </Button>
                        <Button
                            variant={filter === "processing" ? "filled" : "outline"}
                            size="sm"
                            onClick={() => setFilter("processing")}
                        >
                            {t("dashboard.activities.processing")}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("dashboard.activities.orderId")}</TableHead>
                            <TableHead>{t("dashboard.activities.category")}</TableHead>
                            <TableHead>{t("dashboard.activities.company")}</TableHead>
                            <TableHead>{t("dashboard.activities.arrivalTime")}</TableHead>
                            <TableHead>{t("dashboard.activities.route")}</TableHead>
                            <TableHead>{t("dashboard.activities.price")}</TableHead>
                            <TableHead>{t("dashboard.activities.status")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredActivities.map((activity) => (
                            <TableRow key={activity.orderId}>
                                <TableCell className="font-medium">{activity.orderId}</TableCell>
                                <TableCell>{activity.category}</TableCell>
                                <TableCell>{activity.company}</TableCell>
                                <TableCell>{activity.arrivalTime}</TableCell>
                                <TableCell>{activity.route}</TableCell>
                                <TableCell>{activity.price}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusColors[activity.status]}>
                                        {t(`dashboard.activities.${activity.status === "in-transit" ? "inTransit" : activity.status}`)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
