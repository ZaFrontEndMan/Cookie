
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/ui/auth-card";
import { SocialLoginButtons } from "@/components/ui/social-login-buttons";
import { useAuthStore } from "@/stores/authStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { t } = useLanguage();
  const register = useAuthStore((state) => state.register);
  const { toast } = useToast();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    register(userData);
  };

  const handleAzureLogin = () => {
    toast({
      title: "Azure Login",
      description: "Azure AD authentication requires Supabase setup. Configure Azure provider in your Supabase dashboard.",
    });
  };

  const handleLinkedInLogin = () => {
    toast({
      title: "LinkedIn Login",
      description: "LinkedIn authentication requires Supabase setup. Configure LinkedIn provider in your Supabase dashboard.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AuthCard
        title={t("pages.auth.register.title")}
        description={t("pages.auth.register.subtitle")}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("common.firstName")}</Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder={t("common.firstName")}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("common.lastName")}</Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder={t("common.lastName")}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t("common.email")}</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder={t("pages.auth.login.emailPlaceholder")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t("common.password")}</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              placeholder={t("pages.auth.login.passwordPlaceholder")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("pages.auth.register.confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
              placeholder={t("pages.auth.register.confirmPasswordPlaceholder")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="acceptTerms"
              checked={form.watch("acceptTerms")}
              onCheckedChange={(checked) => form.setValue("acceptTerms", !!checked)}
            />
            <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
              {t("pages.auth.register.terms")}
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? t("pages.auth.register.registering") : t("common.register")}
          </Button>

          <SocialLoginButtons
            onAzureClick={handleAzureLogin}
            onLinkedInClick={handleLinkedInLogin}
            isLoading={form.formState.isSubmitting}
          />

          <div className="text-center text-sm text-muted-foreground">
            {t("pages.auth.register.hasAccount")}{" "}
            <Link to="/components/pages/login" className="text-primary hover:underline">
              {t("pages.auth.register.signIn")}
            </Link>
          </div>
        </form>
      </AuthCard>
    </motion.div>
  );
};

export default Register;
