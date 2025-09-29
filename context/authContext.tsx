"use client";

import { Me } from "@/types/auth.type";
import { createContext, useContext, useState, useEffect } from "react";

type AuthContextValue = Me | null;

type AuthContextProviderProps = {
  children: React.ReactNode;
  me: Me | null;
};

const EMPTY_CONTEXT = Symbol("empty");

const AuthContext = createContext<AuthContextValue | typeof EMPTY_CONTEXT>(
  EMPTY_CONTEXT
);

 function AuthProvider({ children, me }: AuthContextProviderProps) {
  const [state, setState] = useState<Me | null>(me || null);

  useEffect(() => {
    if (me !== state) {
      setState(me);
    }
  }, [me, state]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === EMPTY_CONTEXT) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export default AuthProvider;
