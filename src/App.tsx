// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppRoutes } from "@/components/layout/AppRoutes";
import { PaletteProvider } from "@/contexts/PaletteContext";
import FloatingSettings from "./components/layout/FloatingSettings";
import { HelmetProvider } from "react-helmet-async";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check authentication status on app startup
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <PaletteProvider>
        <ThemeProvider>
          <LanguageProvider>
            <HelmetProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppRoutes />
                  <FloatingSettings />
                </BrowserRouter>
              </TooltipProvider>
            </HelmetProvider>
          </LanguageProvider>
        </ThemeProvider>
      </PaletteProvider>
    </QueryClientProvider>
  );
};

export default App;
