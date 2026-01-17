import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LiaCookieBiteSolid } from "react-icons/lia";
import { ThemeToggle, LanguageToggle } from "@/components/common/SettingsToggles";

const Navbar = () => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: "home", href: "/", label: t("navigation.home") },
    { key: "about", href: "/about", label: t("navigation.about") },
    { key: "services", href: "/services", label: t("navigation.services") },
    { key: "contact", href: "/contact", label: t("navigation.contact") },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {/* Scroll Progress Bar - Only on Home Page */}
      {location.pathname === "/" && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
          style={{ scaleX }}
        />
      )}
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 rtl:gap-reverse text-primary"
        >
          <LiaCookieBiteSolid size={24} />
          <Link
            to="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            COOKIE
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 rtl:gap-reverse">
          {navItems.map((item) => (
            <div key={item.key} className="relative">
              <Link
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActiveRoute(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
                  }`}
              >
                {item.label}
              </Link>
              {isActiveRoute(item.href) && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 rtl:gap-reverse">
          <ThemeToggle />
          <LanguageToggle />

          <Button asChild variant="filled" className="hidden md:flex rounded-full px-6">
            <Link to="/admin">
              {t("pages.dashboard.title") || "Dashboard"}
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={toggleMobileMenu}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <HiX className="h-5 w-5" />
              ) : (
                <HiMenu className="h-5 w-5" />
              )}
            </motion.div>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background/95 backdrop-blur"
          >
            <div className="container px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${isActiveRoute(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
