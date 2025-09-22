"use client";

import { AuthUser } from "@/types/auth.type";
import { createContext, useContext } from "react";

type AuthContextValue = AuthUser | null;

const AuthContext = createContext<AuthContextValue>(null);

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AuthUser | null;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
