import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";

const Index = () => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Hero />
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Features />
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <About />
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          id="services"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <Services />
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <Contact />
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Index;
