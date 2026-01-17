import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-center mb-8"
      >
        {t("pages.about.title")}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="prose dark:prose-invert max-w-none"
      >
        <p className="text-lg text-muted-foreground text-center mb-6">
          {t("pages.about.description")}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 border rounded-lg bg-card"
          >
            <h3 className="text-xl font-semibold mb-4">
              {t("pages.about.mission.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("pages.about.mission.description")}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 border rounded-lg bg-card"
          >
            <h3 className="text-xl font-semibold mb-4">
              {t("pages.about.vision.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("pages.about.vision.description")}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
