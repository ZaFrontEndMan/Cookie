import {
  HiChartBar,
  HiDocumentText,
  HiPencil,
  HiClipboard,
  HiAdjustmentsHorizontal,
  HiRectangleStack,
  HiChevronRight,
  HiSquare3Stack3D,
  HiHome,
  HiChartPie,
  HiTableCells,
} from "react-icons/hi2";
import { SidebarItem } from "./DashboardSidebarItem";

export const getSidebarItems = (t: (key: string) => string): SidebarItem[] => [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: HiHome,
    children: [
      {
        id: "analytics",
        label: t("dashboard.analytics.link"),
        icon: HiChartBar,
        path: "/admin/dashboard/analytics",
      },
      {
        id: "ecommerce",
        label: t("dashboard.ecommerce.link"),
        icon: HiChartPie,
        path: "/admin/dashboard/ecommerce",
      },
      {
        id: "overview",
        label: t("dashboard.overview.link"),
        icon: HiTableCells,
        path: "/admin/dashboard/overview",
      },
    ],
  },
  {
    id: "pages",
    label: "Pages",
    icon: HiDocumentText,
    children: [
      {
        id: "login",
        label: t("common.login"),
        icon: HiDocumentText,
        path: "/admin/pages/login",
      },
      {
        id: "register",
        label: t("common.register"),
        icon: HiDocumentText,
        path: "/admin/pages/register",
      },
      {
        id: "profile",
        label: t("common.profile"),
        icon: HiDocumentText,
        path: "/admin/pages/profile",
      },
      {
        id: "products",
        label: t("pages.products.title"),
        icon: HiDocumentText,
        path: "/admin/pages/products",
      },
      {
        id: "add-product",
        label: t("pages.products.addProduct"),
        icon: HiPencil,
        path: "/admin/pages/add-product",
      },
    ],
  },
  {
    id: "ui-elements",
    label: t("pages.dashboard.uiElements"),
    icon: HiClipboard,
    children: [
      {
        id: "charts",
        label: "Charts",
        icon: HiChartBar,
        path: "/admin/ui-elements/charts",
      },
      {
        id: "tables",
        label: "Tables",
        icon: HiClipboard,
        path: "/admin/ui-elements/tables",
      },
      {
        id: "buttons",
        label: t("pages.components.buttons.title"),
        icon: HiPencil,
        path: "/admin/ui-elements/buttons",
      },
      {
        id: "cards",
        label: t("pages.components.cards.title"),
        icon: HiDocumentText,
        path: "/admin/ui-elements/cards",
      },
      {
        id: "inputs",
        label: t("pages.components.inputs.title"),
        icon: HiPencil,
        path: "/admin/ui-elements/inputs",
      },
      {
        id: "tabs",
        label: t("pages.components.tabs.title"),
        icon: HiRectangleStack,
        path: "/admin/ui-elements/tabs",
      },
      {
        id: "toggle",
        label: t("pages.components.toggle.title"),
        icon: HiAdjustmentsHorizontal,
        path: "/admin/ui-elements/toggle",
      },
      {
        id: "forms",
        label: t("pages.components.forms.title"),
        icon: HiClipboard,
        path: "/admin/ui-elements/forms",
      },
      {
        id: "accordion",
        label: "Accordion",
        icon: HiChevronRight,
        path: "/admin/ui-elements/accordion",
      },
      {
        id: "alerts",
        label: "Alerts",
        icon: HiDocumentText,
        path: "/admin/ui-elements/alerts",
      },
      {
        id: "badges",
        label: "Badges",
        icon: HiSquare3Stack3D,
        path: "/admin/ui-elements/badges",
      },
      {
        id: "avatars",
        label: "Avatars",
        icon: HiDocumentText,
        path: "/admin/ui-elements/avatars",
      },
    ],
  },
];

// Legacy export for backward compatibility
export const sidebarItems = getSidebarItems(() => "");
