// src/components/AppRoutes.tsx
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./Layout";
import DashboardLayout from "./dashboard/DashboardLayout";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

// Admin Dashboard pages
import Dashboard from "@/pages/admin/Dashboard";
import Analytics from "@/pages/admin/dashboard/Analytics";
import Ecommerce from "@/pages/admin/dashboard/Ecommerce";
import Overview from "@/pages/admin/dashboard/Overview";

// Admin Page components
import Login from "@/pages/admin/pages/Login";
import Register from "@/pages/admin/pages/Register";
import Profile from "@/pages/admin/pages/Profile";
import Products from "@/pages/admin/pages/Products";
import AddProduct from "@/pages/admin/pages/AddProduct";

// Admin UI Element pages
import Charts from "@/pages/admin/ui-elements/Charts";
import Tables from "@/pages/admin/ui-elements/Tables";
import Buttons from "@/pages/admin/ui-elements/Buttons";
import Cards from "@/pages/admin/ui-elements/Cards";
import Inputs from "@/pages/admin/ui-elements/Inputs";
import Tabs from "@/pages/admin/ui-elements/Tabs";
import Toggle from "@/pages/admin/ui-elements/Toggle";
import Forms from "@/pages/admin/ui-elements/Forms";
import Accordion from "@/pages/admin/ui-elements/Accordion";
import Alerts from "@/pages/admin/ui-elements/Alerts";
import Badges from "@/pages/admin/ui-elements/Badges";
import Avatars from "@/pages/admin/ui-elements/Avatars";

// AI Generator pages
import TextGenerator from "@/pages/ai/TextGenerator";
import CodeGenerator from "@/pages/ai/CodeGenerator";
import ImageGenerator from "@/pages/ai/ImageGenerator";
import VideoGenerator from "@/pages/ai/VideoGenerator";

import { AuthGuard } from "@/components/auth/AuthGuard";

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      {/* Regular layout routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Dashboard layout routes with AuthGuard */}
      <Route path="/admin" element={
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      }>
        <Route index element={<Dashboard />} />

        {/* Dashboard pages */}
        <Route path="dashboard/analytics" element={<Analytics />} />
        <Route path="dashboard/ecommerce" element={<Ecommerce />} />
        <Route path="dashboard/overview" element={<Overview />} />

        {/* Page components */}
        <Route path="pages/profile" element={<Profile />} />
        <Route path="pages/products" element={<Products />} />
        <Route path="pages/add-product" element={<AddProduct />} />

        {/* UI Element pages */}
        <Route path="ui-elements/charts" element={<Charts />} />
        <Route path="ui-elements/tables" element={<Tables />} />
        <Route path="ui-elements/buttons" element={<Buttons />} />
        <Route path="ui-elements/cards" element={<Cards />} />
        <Route path="ui-elements/inputs" element={<Inputs />} />
        <Route path="ui-elements/tabs" element={<Tabs />} />
        <Route path="ui-elements/toggle" element={<Toggle />} />
        <Route path="ui-elements/forms" element={<Forms />} />
        <Route path="ui-elements/accordion" element={<Accordion />} />
        <Route path="ui-elements/alerts" element={<Alerts />} />
        <Route path="ui-elements/badges" element={<Badges />} />
        <Route path="ui-elements/avatars" element={<Avatars />} />

        {/* AI Generator pages */}
        <Route path="ai/text-generator" element={<TextGenerator />} />
        <Route path="ai/code-generator" element={<CodeGenerator />} />
        <Route path="ai/image-generator" element={<ImageGenerator />} />
        <Route path="ai/video-generator" element={<VideoGenerator />} />
      </Route>

      {/* Public login and register routes */}
      <Route path="/admin/pages/login" element={<Login />} />
      <Route path="/admin/pages/register" element={<Register />} />

      {/* 404 route doesn't need to use the layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
