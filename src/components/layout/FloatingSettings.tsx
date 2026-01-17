import { useState } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Flex } from "@/components/ui/flex";
import { Heading } from "@/components/ui/heading";

import { usePalette } from "@/contexts/PaletteContext";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PaletteName } from "@/config/palettes";
import { ThemeToggle, LanguageToggle } from "@/components/common/SettingsToggles";

// Ripple that is ALWAYS mounted (no AnimatePresence), so it starts immediately
function PopoverRipple({ open }: { open: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }}
      transition={{ duration: 0.12 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-xl border-2 border-primary/30"
          initial={false}
          animate={
            open
              ? {
                scale: [0.9, 2.2],
                opacity: [0.45, 0],
                transition: {
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: "easeOut",
                },
              }
              : { scale: 0.9, opacity: 0 }
          }
        />
      ))}
    </motion.div>
  );
}

export default function FloatingSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { palette, setPalette, availablePalettes } = usePalette();
  const { t } = useLanguage();

  const handlePaletteChange = (newPalette: PaletteName) => {
    setPalette(newPalette);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          className="bottom-6 end-6 z-50 fixed"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg relative"
            variant="filled"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </motion.div>
      </PopoverTrigger>

      {/* Key fixes:
          - p-0 on PopoverContent (padding moved inside)
          - inner wrapper is the "clip + relative" container
          - ripple is absolutely positioned inside the wrapper */}
      <PopoverContent
        side="top"
        align="end"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-80 p-0"
        // optional: ensure transform-origin is correct for popper animations
        style={{
          transformOrigin: "var(--radix-popover-content-transform-origin)",
        }}
      >
        <div className="relative overflow-hidden rounded-xl p-4">
          <PopoverRipple open={isOpen} />

          <div className="relative z-10">
            <Flex direction="col" gap={4}>
              {/* Toggles Row */}
              <div className="flex items-center justify-between gap-4">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {availablePalettes.map((paletteOption) => (
                  <Button
                    key={paletteOption.id}
                    onClick={() => handlePaletteChange(paletteOption.id)}
                    variant={palette === paletteOption.id ? "outline" : "ghost"}
                    size="sm"
                    className="flex flex-col items-center gap-2 h-auto p-3 text-xs"
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-background shadow-md"
                      style={{
                        backgroundColor: `hsl(${paletteOption.preview})`,
                      }}
                    />
                    <span className="font-medium leading-tight text-center">
                      {paletteOption.name}
                    </span>
                  </Button>
                ))}
              </div>
            </Flex>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
