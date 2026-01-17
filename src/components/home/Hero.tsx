import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Flex } from "@/components/ui/flex";

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="text-center relative overflow-hidden min-h-[70vh]  from-background to-background/80 dark:from-background dark:to-background/90">
      <Flex direction="row" justify="center" align="center" wrap="wrap" gap={4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full pt-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold rtl:bg-gradient-to-r bg-gradient-to-l from-secondary via-primary to-secondary bg-clip-text text-transparent w-full text-nowrap py-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-md text-deep-teal/80 dark:text-sage/90 my-6 "
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:from-deep-teal hover:to-primary transition-all duration-300 shadow-lg hover:shadow-secondary/20 transform hover:scale-105 text-sm md:text-base"
            >
              {t("hero.cta")}
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="px-6 py-2.5 md:px-8 md:py-3 border-2 border-secondary text-primary hover:bg-secondary hover:text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            >
              {t("hero.secondaryCta")}
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-3 bg-secondary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Flex>
    </section >
  );
};

export default Hero;
