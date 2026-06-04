import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export type UserType = "individual" | "sme" | null;
export type Plan = "free" | "pro";

type Ctx = {
  // Session
  user: User | null;
  session: Session | null;
  loading: boolean;
  // Profile (from user_metadata)
  userType: UserType;
  plan: Plan;
  // Mutators
  setUserType: (t: UserType) => Promise<void>;
  setPlan: (p: Plan) => Promise<void>;
  // Auth methods
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    userType: UserType,
  ) => Promise<{ error: Error | null; needsConfirmation: boolean }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    // Then check existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const userType: UserType =
    meta.user_type === "individual" || meta.user_type === "sme"
      ? (meta.user_type as UserType)
      : null;
  const plan: Plan = meta.plan === "pro" ? "pro" : "free";

  const setUserType = useCallback(async (t: UserType) => {
    if (!t) return;
    const { data, error } = await supabase.auth.updateUser({
      data: { user_type: t },
    });
    if (!error && data.user) setUser(data.user);
  }, []);

  const setPlan = useCallback(async (p: Plan) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { plan: p },
    });
    if (!error && data.user) setUser(data.user);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fullName: string, ut: UserType) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            user_type: ut,
            plan: "free",
          },
        },
      });
      return {
        error: error as Error | null,
        needsConfirmation: !data.session && !error,
      };
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (result.error) return { error: result.error as Error };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    return { error: error as Error | null };
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        session,
        loading,
        userType,
        plan,
        setUserType,
        setPlan,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export const useAuth = useApp;

export function formatTL(n: number, lang: "tr" | "en" = "tr") {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(n);
}
