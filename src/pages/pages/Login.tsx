
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthCard } from "@/components/ui/auth-card";
import { SocialLoginButtons } from "@/components/ui/social-login-buttons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false)
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { t } = useLanguage();
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (error) {
      console.error("Login failed:", error);
    }
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
        title={t("pages.auth.login.title")}
        description={t("pages.auth.login.subtitle")}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("pages.auth.login.emailPlaceholder")}
                      {...field}
                    />
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
                  <FormLabel>{t("common.password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("pages.auth.login.passwordPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("pages.auth.login.rememberMe")}</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? t("pages.auth.login.signingIn") : t("common.login")}
            </Button>

            <SocialLoginButtons
              onAzureClick={handleAzureLogin}
              onLinkedInClick={handleLinkedInLogin}
              isLoading={form.formState.isSubmitting}
            />

            <div className="text-center space-y-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t("pages.auth.login.forgotPassword")}
              </Link>
              <p className="text-sm text-muted-foreground">
                {t("pages.auth.login.noAccount")}{" "}
                <Link
                  to="/components/pages/register"
                  className="text-primary hover:underline"
                >
                  {t("pages.auth.login.signUp")}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </AuthCard>
    </motion.div>
  );
};

export default Login;
