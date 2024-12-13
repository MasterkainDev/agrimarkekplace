"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { Session } from "@/lib/auth";

interface AuthState {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  user: Session['user'] | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  loading: true,
  isAuthenticated: false,
  user: null,
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ 
      session: data.session,
      user: data.user,
      isAuthenticated: !!data.session,
      loading: false
    });
  },
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    set({ 
      session: data.session,
      user: data.user,
      isAuthenticated: !!data.session,
      loading: false
    });
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ 
      session: null,
      user: null,
      isAuthenticated: false,
      loading: false
    });
  },
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
}));