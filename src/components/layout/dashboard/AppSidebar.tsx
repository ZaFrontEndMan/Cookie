import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  PlusCircle,
  LogIn,
  UserPlus,
  User,
  Palette,
  Grid3X3,
  Table,
  Calendar,
  Bell,
  Badge,
  ToggleLeft,
  Activity,
  Cookie,
  Sparkles,
  FileCode,
  Image,
  Video,
  Type,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { LiaCookieBiteSolid } from "react-icons/lia";

const AppSidebar = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { state, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isRTL = language === "ar";

  const header = {
    title: "Cookie",
    url: "/",
    icon: Cookie,
  };
  const dashboardItems = [
    {
      title: t("dashboard.overview.link"),
      url: "/admin/dashboard/overview",
      icon: Home,
    },
    {
      title: t("dashboard.analytics.link"),
      url: "/admin/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: t("dashboard.ecommerce.link"),
      url: "/admin/dashboard/ecommerce",
      icon: ShoppingCart,
    },
  ];

  const aiAssistantItems = [
    {
      title: t("aiAssistant.generators.text.title"),
      url: "/admin/ai/text-generator",
      icon: Type,
    },
    {
      title: t("aiAssistant.generators.code.title"),
      url: "/admin/ai/code-generator",
      icon: FileCode,
    },
    {
      title: t("aiAssistant.generators.image.title"),
      url: "/admin/ai/image-generator",
      icon: Image,
    },
    {
      title: t("aiAssistant.generators.video.title"),
      url: "/admin/ai/video-generator",
      icon: Video,
    },
  ];

  const pageItems = [
    {
      title: t("pages.products.title"),
      url: "/admin/pages/products",
      icon: Grid3X3,
    },
    {
      title: t("pages.products.addProduct"),
      url: "/admin/pages/add-product",
      icon: PlusCircle,
    },
    {
      title: t("pages.auth.login.title"),
      url: "/admin/pages/login",
      icon: LogIn,
    },
    {
      title: t("pages.auth.register.title"),
      url: "/admin/pages/register",
      icon: UserPlus,
    },
    {
      title: t("pages.profile.title"),
      url: "/admin/pages/profile",
      icon: User,
    },
  ];

  const uiElementItems = [
    {
      title: t("components.buttons"),
      url: "/admin/ui-elements/buttons",
      icon: Palette,
    },
    {
      title: t("components.cards"),
      url: "/admin/ui-elements/cards",
      icon: Grid3X3,
    },
    {
      title: t("components.forms"),
      url: "/admin/ui-elements/forms",
      icon: FileText,
    },
    {
      title: t("components.inputs"),
      url: "/admin/ui-elements/inputs",
      icon: Settings,
    },
    {
      title: t("components.tables"),
      url: "/admin/ui-elements/tables",
      icon: Table,
    },
    {
      title: t("components.tabs"),
      url: "/admin/ui-elements/tabs",
      icon: Calendar,
    },
    {
      title: t("components.alerts"),
      url: "/admin/ui-elements/alerts",
      icon: Bell,
    },
    {
      title: t("components.badges"),
      url: "/admin/ui-elements/badges",
      icon: Badge,
    },
    {
      title: t("components.toggle"),
      url: "/admin/ui-elements/toggle",
      icon: ToggleLeft,
    },
    {
      title: t("components.accordion"),
      url: "/admin/ui-elements/accordion",
      icon: Activity,
    },
    {
      title: t("components.avatars"),
      url: "/admin/ui-elements/avatars",
      icon: Users,
    },
    {
      title: t("components.charts"),
      url: "/admin/ui-elements/charts",
      icon: BarChart3,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" side={isRTL ? "right" : "left"}>
      {!isCollapsed && (
        <motion.div
          key="sidebar-header"
          initial={{ opacity: 0, height: 0, y: -8 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <SidebarHeader>
            <motion.div
              className="flex items-center gap-2 text-primary ms-2"
              initial={{ x: -6 }}
              animate={{ x: 0 }}
              exit={{ x: -6 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <LiaCookieBiteSolid size={28} />
              <Link
                to="/"
                className="text-2xl font-bold hover:text-primary transition-colors"
              >
                COOKIE
              </Link>
            </motion.div>
          </SidebarHeader>
        </motion.div>
      )}

      <SidebarContent>
        {/* Dashboard Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && t("dashboard.title")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink
                      to={item.url}
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* AI Assistant Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && t("aiAssistant.title")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiAssistantItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Pages Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && t("pages.title")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pageItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* UI Elements Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && t("pages.dashboard.uiElements")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {uiElementItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
