"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import type { Session } from '@/lib/auth';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  user: Session['user'] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}