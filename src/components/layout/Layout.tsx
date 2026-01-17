import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const Layout = () => {
  const lines = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      key: i,
      top: Math.random() * 100,
      rotation: 5 + Math.random() * 40,
      width: 150 + Math.random() * 200,
    }));
  }, []);

  const location = useLocation();

  return (
    <div className="min-h-screen text-foreground">
      {/* Environmental Background - Fixed positioning */}
      <div className="fixed pointer-events-none h-full w-full">
        <div className="absolute bg-gradient-to-br from-env-deep-teal/5 via-primary/8 to-secondary/12 h-full w-full">
          {/* Organic diagonal flow lines */}
          <div className="absolute inset-0">
            {lines.map((line) => (
              <div
                key={line.key}
                className="absolute h-px bg-gradient-to-l from-primary/50 via-secondary/30 to-primary-foreground/15"
                style={{
                  width: `${line.width}%`,
                  top: `${line.top}%`,
                  left: "-50%",
                  transform: `rotate(${line.rotation}deg)`,
                  opacity: 80,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Navbar />
      <main className="mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* We need a keyed wrapper (like a fragment or div) for AnimatePresence to track changes */}
          {/* However, since our pages have motion.div as root, we can just render Outlet with key, 
              but Outlet itself doesn't accept key in a way that forces remount for AnimatePresence usually.
              Best practice: wrap Outlet in a generic Route-like structure OR just pass key to Outlet if supported (it's not).
              Actually, React Router's useOutlet return value works. 
              But cleaner: Render a clone or just wrap in a keyed div if pages don't have absolute positioning issues.
              Given our pages have motion.div with exit animations, we can try wrapping Outlet in a div/Fragment with key.
          */}
          <div key={location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
