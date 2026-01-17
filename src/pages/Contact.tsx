import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    let text = "";
    if (language === "ar") {
      text = `📩 رسالة جديدة من نموذج الاتصال:\n👤 الاسم: ${name}\n📧 البريد الإلكتروني: ${email}\n💬 الرسالة: ${message}`;
    } else {
      text = `📩 New contact form submission:\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;
    }
    const encodedMessage = encodeURIComponent(text.trim());
    const whatsappNumber = "201141741315";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const recipient = "aw83845@gmail.com";
    const subject = language === "ar" ? "رسالة اتصال جديدة" : "New Contact Message";
    const body = language === "ar" ?
      `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالرسالة:\n${message}` :
      `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`;

    window.open(`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

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
        {t("pages.contact.title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-muted-foreground text-center mb-12"
      >
        {t("pages.contact.description")}
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            {t("pages.contact.info.title")}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rtl:gap-reverse">
              <HiMail className="h-5 w-5 text-primary" />
              <span>aw83845@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 rtl:gap-reverse">
              <HiPhone className="h-5 w-5 text-primary" />
              <span dir="ltr">+20 114 174 1315</span>
            </div>
            <div className="flex items-center gap-3 rtl:gap-reverse">
              <HiLocationMarker className="h-5 w-5 text-primary" />
              <span>{t("pages.contact.info.location")}</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t("pages.contact.form.name")}
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder={t("pages.contact.form.namePlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("pages.contact.form.email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={t("pages.contact.form.emailPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {t("pages.contact.form.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder={t("pages.contact.form.messagePlaceholder")}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button type="button" onClick={handleWhatsAppSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white">
              {t("pages.contact.form.whatsapp")}
            </Button>
            <Button type="button" onClick={handleEmailSubmit} variant="outline" className="w-full">
              {t("pages.contact.form.submit")}
            </Button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
