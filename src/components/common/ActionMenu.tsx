
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export interface ActionMenuOption {
  value: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface ActionMenuProps {
  options: ActionMenuOption[];
  className?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ options, className = "" }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={option.onClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            {option.icon && <span className="h-4 w-4">{option.icon}</span>}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
