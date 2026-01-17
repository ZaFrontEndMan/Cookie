
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { getSidebarItems } from "./DashboardSidebarData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebarStore } from "@/stores/sidebarStore";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const { isCollapsed } = useSidebarStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "dashboard",
    "pages",
    "ui-elements",
  ]);

  const sidebarItems = getSidebarItems(t);

  const toggleExpanded = (itemId: string) => {
    if (!isCollapsed) {
      setExpandedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 64 : 256,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className="hidden lg:block fixed start-0 top-16 h-[calc(100vh-4rem)] bg-card border-e z-40"
      >
        <ScrollArea className="h-full">
          <div className={`p-6 ${isCollapsed ? 'px-2' : ''}`}>
            <motion.div
              initial={false}
              animate={{ 
                opacity: isCollapsed ? 0 : 1,
                x: isCollapsed ? -20 : 0
              }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold mb-8 overflow-hidden"
            >
              {!isCollapsed && t("dashboard.menu")}
            </motion.div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <DashboardSidebarItem
                  key={item.id}
                  item={item}
                  expandedItems={isCollapsed ? [] : expandedItems}
                  onToggleExpanded={toggleExpanded}
                  onItemClick={onClose}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </div>
        </ScrollArea>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-card border-r z-40"
          >
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="text-xl font-bold mb-8">{t("dashboard.menu")}</div>
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <DashboardSidebarItem
                      key={item.id}
                      item={item}
                      expandedItems={expandedItems}
                      onToggleExpanded={toggleExpanded}
                      onItemClick={onClose}
                      isCollapsed={false}
                    />
                  ))}
                </nav>
              </div>
            </ScrollArea>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
