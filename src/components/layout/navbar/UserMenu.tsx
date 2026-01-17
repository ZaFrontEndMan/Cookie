
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  HiUser, 
  HiCog, 
  HiSupport, 
  HiLogout,
  HiCreditCard,
  HiShieldCheck
} from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "profile":
        navigate("/admin/pages/profile");
        break;
      case "settings":
        // Settings handled by FloatingSettings
        break;
      case "billing":
        // Navigate to billing
        break;
      case "support":
        // Navigate to support
        break;
      case "logout":
        logout();
        navigate("/admin/pages/login");
        break;
      default:
        break;
    }
  };

  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userEmail = user?.email || "user@example.com";
  const userInitials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}` : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.email ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}` : undefined} alt={userName} />
            <AvatarFallback>{userInitials || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleMenuAction("profile")}>
          <HiUser className="me-2 h-4 w-4" />
          {t("user.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMenuAction("settings")}>
          <HiCog className="me-2 h-4 w-4" />
          {t("user.settings")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMenuAction("billing")}>
          <HiCreditCard className="me-2 h-4 w-4" />
          {t("user.billing")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMenuAction("security")}>
          <HiShieldCheck className="me-2 h-4 w-4" />
          {t("user.security")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleMenuAction("support")}>
          <HiSupport className="me-2 h-4 w-4" />
          {t("user.support")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => handleMenuAction("logout")}
          className="text-red-600 focus:text-red-600"
        >
          <HiLogout className="me-2 h-4 w-4" />
          {t("user.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
