import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AppSidebar from "./AppSidebar";
import SearchInput from "../navbar/SearchInput";
import NotificationMenu from "../navbar/NotificationMenu";
import UserMenu from "../navbar/UserMenu";
import FloatingSettings from "../FloatingSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle, LanguageToggle } from "@/components/common/SettingsToggles";

const DashboardLayout = () => {
  const { t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <SidebarInset>
          {/* Dashboard Header */}
          <header className="sticky z-10 top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 md:h-16 items-center justify-between px-4 lg:px-6">
              {/* Left side - Sidebar trigger + Logo + Title */}
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link to="/admin" className="text-xl font-bold hover:text-primary transition-colors">
                  {t("dashboard.title")}
                </Link>
              </div>

              {/* Right side - Theme, Language, Search, Notifications, User Menu */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="hidden sm:block">
                  <LanguageToggle />
                </div>
                <SearchInput />
                <NotificationMenu />
                <UserMenu />
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 lg:p-8">
            <Outlet />
          </main>
        </SidebarInset>

        {/* Floating Settings Panel */}
        <FloatingSettings />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
