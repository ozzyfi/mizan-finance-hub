import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useApp, type UserType } from "@/state/AppContext";
import { toast } from "sonner";

const search = z.object({
  type: z.enum(["individual", "sme"]).optional(),
});

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "HelalYol — Kaydol" }] }),
  validateSearch: search,
  component: SignupPage,
});

const schema = z
  .object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function SignupPage() {
  const { lang } = useTranslation();
  const { user, signUp, signInWithGoogle, loading } = useApp();
  const navigate = useNavigate();
  const { type } = Route.useSearch();
  const userType: UserType = type ?? "individual";
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", password: "", confirm: "" },
  });

  const tr = lang === "tr";

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    const { error, needsConfirmation } = await signUp(
      values.email,
      values.password,
      values.fullName,
      userType,
    );
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (needsConfirmation) {
      toast.success(
        tr
          ? "Hesap oluşturuldu. E-postanızı doğrulayıp giriş yapın."
          : "Account created. Please verify your email and sign in.",
      );
      navigate({ to: "/login" });
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

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            H
          </div>
          <span className="font-semibold">HelalYol</span>
        </Link>
        <LanguageToggle />
      </header>

      <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {tr ? "Hesap Oluşturun" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tr
              ? `Profil: ${userType === "sme" ? "KOBİ / Girişimci" : "Bireysel"}`
              : `Profile: ${userType === "sme" ? "SME / Entrepreneur" : "Individual"}`}
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
              <span className="bg-card px-2 text-muted-foreground">
                {tr ? "veya" : "or"}
              </span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">{tr ? "Ad Soyad" : "Full name"}</Label>
              <Input id="fullName" {...form.register("fullName")} />
              {form.formState.errors.fullName && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{tr ? "E-posta" : "Email"}</Label>
              <Input id="email" type="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{tr ? "Şifre" : "Password"}</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm">
                {tr ? "Şifreyi Doğrula" : "Confirm Password"}
              </Label>
              <Input id="confirm" type="password" {...form.register("confirm")} />
              {form.formState.errors.confirm && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.confirm.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {tr ? "Kaydol" : "Sign Up"}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {tr ? "Zaten hesabınız var mı? " : "Already have an account? "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            {tr ? "Giriş yapın" : "Sign in"}
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
