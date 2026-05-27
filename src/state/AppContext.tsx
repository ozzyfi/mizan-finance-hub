import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserType = "individual" | "sme" | null;

type Ctx = {
  userType: UserType;
  setUserType: (t: UserType) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userType, setUserTypeState] = useState<UserType>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("mizan_user_type");
    if (stored === "individual" || stored === "sme") setUserTypeState(stored);
  }, []);

  const setUserType = (t: UserType) => {
    setUserTypeState(t);
    if (typeof window !== "undefined") {
      if (t) localStorage.setItem("mizan_user_type", t);
      else localStorage.removeItem("mizan_user_type");
    }
  };

  return <AppContext.Provider value={{ userType, setUserType }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function formatTL(n: number, lang: "tr" | "en" = "tr") {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(n);
}
