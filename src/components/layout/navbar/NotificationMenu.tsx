
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiBell, HiExclamation, HiInformationCircle, HiCheckCircle } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface Notification {
  id: string;
  titleKey: string;
  messageKey: string;
  type: "info" | "warning" | "success";
  time: string;
  isRead: boolean;
}

const NotificationMenu = () => {
  const { t } = useLanguage();
  const notifications = useMemo<Notification[]>(() => [
    {
      id: "1",
      titleKey: "notifications.newOrder",
      messageKey: "notifications.orderReceived",
      type: "success",
      time: "2 min ago",
      isRead: false,
    },
    {
      id: "2",
      titleKey: "notifications.systemUpdate",
      messageKey: "notifications.maintenanceScheduled",
      type: "info",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      titleKey: "notifications.lowStockAlert",
      messageKey: "notifications.inventoryLow",
      type: "warning",
      time: "3 hours ago",
      isRead: true,
    },
  ], []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <HiCheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <HiExclamation className="h-4 w-4 text-yellow-500" />;
      default:
        return <HiInformationCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <HiBell className="h-4 w-4" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -end-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-semibold">
          {t("notifications.title")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex items-start gap-3 p-3 cursor-pointer ${
                !notification.isRead ? "bg-accent/50" : ""
              }`}
            >
              {getIcon(notification.type)}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{t(notification.titleKey)}</p>
                <p className="text-xs text-muted-foreground">
                  {t(notification.messageKey)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              {!notification.isRead && (
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          <span className="text-sm text-muted-foreground">
            {t("notifications.viewAll")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
