import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Palette, PaletteName, palettes } from "@/config/palettes";

interface PaletteContextType {
  palette: PaletteName;
  setPalette: (paletteName: PaletteName) => void;
  changePalette: (paletteName: PaletteName) => void;
  availablePalettes: Array<{
    id: PaletteName;
    name: string;
    preview: string;
  }>;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPaletteState] = useState<PaletteName>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("palette") as PaletteName;
      return saved || palettes[0].name;
    }
    return palettes[0].name;
  });

  const availablePalettes = palettes.map((p) => ({
    id: p.name,
    name: p.name,
    preview: p.light.primary || "#3b82f6",
  }));

  const applyPaletteColors = (currentPaletteName: PaletteName) => {
    const currentPalette = palettes.find((p) => p.name === currentPaletteName);
    if (!currentPalette) return;

    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const colors = isDark ? currentPalette.dark : currentPalette.light;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  const setPalette = (paletteName: PaletteName) => {
    setPaletteState(paletteName);
    applyPaletteColors(paletteName);
    localStorage.setItem("palette", paletteName);
  };

  useEffect(() => {
    applyPaletteColors(palette);
  }, [palette]);

  // Listen for theme changes to reapply palette colors
  useEffect(() => {
    const handleThemeChange = () => {
      applyPaletteColors(palette);
    };

    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, [palette]);

  const changePalette = (paletteName: PaletteName) => {
    setPalette(paletteName);
  };

  return (
    <PaletteContext.Provider
      value={{
        palette,
        setPalette,
        changePalette,
        availablePalettes,
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
};
