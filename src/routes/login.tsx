import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp } from "@/state/AppContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "HelalYol — Giriş" }] }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginPage() {
  const { lang } = useTranslation();
  const { user, signIn, signInWithGoogle, resetPassword, loading } = useApp();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    const { error } = await signIn(values.email, values.password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate({ to: "/dashboard" });
    }
  });

  const onGoogle = async () => {
    setSubmitting(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setSubmitting(false);
      toast.error(error.message);
    }
  };

  const onForgot = async () => {
    const email = form.getValues("email");
    if (!email) {
      toast.error(lang === "tr" ? "Önce e-posta adresinizi girin" : "Enter your email first");
      return;
    }
    const { error } = await resetPassword(email);
    if (error) toast.error(error.message);
    else
      toast.success(
        lang === "tr"
          ? "Sıfırlama bağlantısı e-postanıza gönderildi"
          : "Reset link sent to your email",
      );
  };

  const tr = lang === "tr";

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur">
        <Link to="/" className="flex items-center" aria-label="HelalYol">
          <Logo variant="horizontal" className="h-9 sm:h-10 max-w-[220px]" />
        </Link>
        <LanguageToggle />
      </header>

      <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {tr ? "Tekrar hoş geldiniz" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tr ? "Hesabınıza giriş yapın" : "Sign in to your account"}
          </p>
        </div>

        <Card className="space-y-4 p-6 shadow-soft">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={submitting}
            onClick={onGoogle}
          >
            <GoogleIcon /> {tr ? "Google ile Devam Et" : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">{tr ? "veya" : "or"}</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">{tr ? "E-posta" : "Email"}</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{tr ? "Şifre" : "Password"}</Label>
                <button
                  type="button"
                  onClick={onForgot}
                  className="text-xs text-primary hover:underline"
                >
                  {tr ? "Şifremi unuttum" : "Forgot password"}
                </button>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {tr ? "Giriş Yap" : "Sign In"}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {tr ? "Hesabınız yok mu? " : "Don't have an account? "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            {tr ? "Kaydolun" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 7.1 29.3 5 24 5 16.3 5 9.7 9.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 43c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 34 26.7 35 24 35c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 38.6 16.2 43 24 43z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.2 5.2C41.4 35.9 44 30.4 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
