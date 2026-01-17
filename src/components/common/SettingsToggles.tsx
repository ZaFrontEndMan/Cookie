import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const { language } = useLanguage();
    const isRTL = language === "ar";

    return (
        <div className="flex items-center bg-muted/50 p-1 rounded-full border relative" dir="ltr">
            <motion.div
                className="absolute bg-background rounded-full shadow-sm"
                layoutId="theme-toggle"
                initial={false}
                animate={{
                    width: "2rem",
                    height: "2rem",
                    x: theme === "light" ? 0 : "2rem"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full z-10 hover:bg-transparent"
                onClick={() => setTheme("light")}
            >
                <Sun className={`h-4 w-4 transition-colors ${theme === "light" ? "text-foreground" : "text-muted-foreground"}`} />
                <span className="sr-only">Light Mode</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full z-10 hover:bg-transparent"
                onClick={() => setTheme("dark")}
            >
                <Moon className={`h-4 w-4 transition-colors ${theme === "dark" ? "text-foreground" : "text-muted-foreground"}`} />
                <span className="sr-only">Dark Mode</span>
            </Button>
        </div>
    );
};

export const LanguageToggle = () => {
    const { language, changeLanguage } = useLanguage();
    const isRTL = language === "ar";

    return (
        <div className="flex items-center bg-muted/50 p-1 rounded-full border relative" dir="ltr">
            <motion.div
                className="absolute bg-background rounded-full shadow-sm"
                layoutId="lang-toggle"
                initial={false}
                animate={{
                    width: "auto",
                    height: "2rem",
                    x: language === "en" ? 0 : "100%"
                }}
                style={{
                    width: "50%",
                    left: 0
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-3 rounded-full text-xs font-bold z-10 flex-1 hover:bg-transparent transition-colors ${language === "en" ? "text-foreground" : "text-muted-foreground"}`}
                onClick={() => changeLanguage("en")}
            >
                EN
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-3 rounded-full text-xs font-bold z-10 flex-1 hover:bg-transparent transition-colors ${language === "ar" ? "text-foreground" : "text-muted-foreground"}`}
                onClick={() => changeLanguage("ar")}
            >
                AR
            </Button>
        </div>
    );
};
