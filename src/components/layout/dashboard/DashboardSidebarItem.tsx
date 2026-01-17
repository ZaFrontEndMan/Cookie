
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
  path?: string;
}

interface DashboardSidebarItemProps {
  item: SidebarItem;
  level?: number;
  expandedItems: string[];
  onToggleExpanded: (itemId: string) => void;
  onItemClick: () => void;
  isCollapsed?: boolean;
}

const DashboardSidebarItem: React.FC<DashboardSidebarItemProps> = ({
  item,
  level = 0,
  expandedItems,
  onToggleExpanded,
  onItemClick,
  isCollapsed = false,
}) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.id);
  const isActive = item.path ? location.pathname === item.path : false;

  const ItemContent = () => (
    <div className="mb-1">
      {hasChildren ? (
        <button
          onClick={() => onToggleExpanded(item.id)}
          className={cn(
            "w-full flex items-center px-4 py-3 text-sm hover:bg-accent transition-colors rounded-lg",
            level > 0 && "ms-4",
            isExpanded && "bg-accent",
            isCollapsed ? "justify-center px-2" : "justify-between"
          )}
        >
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "gap-3"
          )}>
            <item.icon className="w-5 h-5 text-muted-foreground" />
            {!isCollapsed && <span>{item.label}</span>}
          </div>
          {!isCollapsed && (
            isExpanded ? (
              <HiChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <HiChevronRight className="w-4 h-4 text-muted-foreground" />
            )
          )}
        </button>
      ) : (
        <Link
          to={item.path || "#"}
          onClick={onItemClick}
          className={cn(
            "flex items-center px-4 py-3 text-sm transition-colors rounded-lg",
            level > 0 && "ms-4",
            isActive && "bg-primary text-primary-foreground",
            isCollapsed ? "justify-center px-2" : "gap-3"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5",
            isActive ? "text-primary-foreground" : "text-muted-foreground"
          )} />
          {!isCollapsed && (
            <span className={cn(isActive ? "text-primary-foreground" : "")}>
              {item.label}
            </span>
          )}
        </Link>
      )}

      <AnimatePresence>
        {hasChildren && isExpanded && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden my-1"
          >
            <div className="mt-1 space-y-2">
              {item.children?.map((child) => (
                <DashboardSidebarItem
                  key={child.id}
                  item={child}
                  level={level + 1}
                  expandedItems={expandedItems}
                  onToggleExpanded={onToggleExpanded}
                  onItemClick={onItemClick}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ItemContent />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="ms-2">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <ItemContent />;
};

export default DashboardSidebarItem;
