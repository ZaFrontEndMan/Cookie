import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { HiCode, HiDesktopComputer, HiDeviceMobile } from "react-icons/hi";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";

const Services: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const services = [
    {
      icon: HiCode,
      title: t("pages.services.web.title"),
      description: t("pages.services.web.description"),
    },
    {
      icon: HiDeviceMobile,
      title: t("pages.services.mobile.title"),
      description: t("pages.services.mobile.description"),
    },
    {
      icon: HiDesktopComputer,
      title: t("pages.services.desktop.title"),
      description: t("pages.services.desktop.description"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-center mb-8"
      >
        {t("pages.services.title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-muted-foreground text-center mb-12"
      >
        {t("pages.services.description")}
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const ref = useRef<HTMLDivElement>(null);
          const inView = useInView(ref, { once: true, amount: 0.3 });

          return (
            <motion.div
              key={service.title}
              ref={ref}
              initial={{
                opacity: 0,
                y: 30,
                rotate: isMobile ? 10 : 0,
              }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 30,
                rotate: inView && isMobile ? 0 : isMobile ? 10 : 0,
              }}
              transition={{
                delay: 0.6 + index * 0.2,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-lg bg-card text-center"
            >
              <service.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              <Button variant="outline" className="w-full">
                {t("common.learnMore")}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Services;
