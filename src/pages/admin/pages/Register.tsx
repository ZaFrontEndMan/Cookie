import { useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SocialLoginButtons } from "@/components/ui/social-login-buttons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { LiaCookieBiteSolid } from "react-icons/lia";
import SEO from "@/components/common/SEO";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const lines = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      key: i,
      top: Math.random() * 100,
      rotation: 5 + Math.random() * 40,
      width: 150 + Math.random() * 200,
    }));
  }, []);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registration attempt:", data);
    // In a real app, you would call the registration API here
    toast({
      title: t("common.registerSuccess") || "Registration successful",
      description: t("common.accountCreated") || "Your account has been created.",
    });
    // Redirect to login or dashboard
    setTimeout(() => navigate("/admin/pages/login"), 1500);
  };

  const handleAzureLogin = () => {
    toast({
      title: "Azure Login",
      description: "Azure AD authentication requires Supabase setup.",
    });
  };

  const handleLinkedInLogin = () => {
    toast({
      title: "LinkedIn Login",
      description: "LinkedIn authentication requires Supabase setup.",
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <SEO title={t("common.register")} />
      {/* Left Column - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col justify-center p-8 md:p-12 lg:p-16 relative bg-background"
      >
        <Link
          to="/admin"
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          {t("common.backToDashboard") || "Back to dashboard"}
        </Link>

        <div className="w-full max-w-sm mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{t("pages.auth.register.title")}</h1>
            <p className="text-muted-foreground">{t("pages.auth.register.subtitle")}</p>
          </div>

          <div className="space-y-4">
            <SocialLoginButtons
              onAzureClick={handleAzureLogin}
              onLinkedInClick={handleLinkedInLogin}
              isLoading={form.formState.isSubmitting}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pages.auth.register.fullName")} <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder={t("pages.auth.register.fullNamePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common.email")} <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="info@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common.password")} <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={t("pages.auth.login.passwordPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pages.auth.register.confirmPassword")} <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={t("pages.auth.register.confirmPasswordPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">
                  By creating an account, you agree to our <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? t("pages.auth.register.registering") : t("common.register")}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {t("pages.auth.register.hasAccount")}{" "}
                </span>
                <Link to="/admin/pages/login" className="font-medium text-primary hover:underline">
                  {t("pages.auth.register.signIn")}
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>

      {/* Right Column - Brand */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 text-primary-foreground"
      >
        {/* Background Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lines.map((line) => (
            <div
              key={line.key}
              className="absolute h-px bg-white/20"
              style={{
                width: `${line.width}%`,
                top: `${line.top}%`,
                left: "-50%",
                transform: `rotate(${line.rotation}deg)`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 p-12">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm shadow-xl">
            <LiaCookieBiteSolid size={64} className="text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{t("common.brandTitle")}</h2>
            <p className="text-blue-100 max-w-md">
              {t("common.brandSubtitle")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;
