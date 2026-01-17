import { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeContextType } from "@/types/theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return saved || "light";
    }
    return "light";
  });

  const setTheme = (newTheme: Theme | ((prevTheme: Theme) => Theme)) => {
    if (typeof newTheme === 'function') {
      setThemeState(prevTheme => newTheme(prevTheme));
    } else {
      setThemeState(newTheme);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes first
    root.classList.remove("light", "dark");

    // Determine the actual theme to apply
    let actualTheme = theme;
    if (theme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    // Add the current theme class
    root.classList.add(actualTheme);

    // Save to localStorage
    localStorage.setItem("theme", theme);

    // Trigger a custom event to notify palette context
    window.dispatchEvent(
      new CustomEvent("themeChanged", { detail: actualTheme })
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
