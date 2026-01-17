import { motion } from "framer-motion";
import { Smartphone, Moon, Globe, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Smartphone,
      title: t("features.responsive.title"),
      description: t("features.responsive.description"),
    },
    {
      icon: Moon,
      title: t("features.theme.title"),
      description: t("features.theme.description"),
    },
    {
      icon: Globe,
      title: t("features.i18n.title"),
      description: t("features.i18n.description"),
    },
    {
      icon: Zap,
      title: t("features.animations.title"),
      description: t("features.animations.description"),
    },
  ];

  return (
    <section className="md:p-20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("features.title")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="h-full"
          >
            <Card className="h-full text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
