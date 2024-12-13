import { z } from 'zod';
import { Session as SupabaseSession } from '@supabase/supabase-js';

export const AuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const UpdatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type AuthFormData = z.infer<typeof AuthSchema>;
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;
export type UpdatePasswordFormData = z.infer<typeof UpdatePasswordSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export type Session = SupabaseSession;

export interface AuthState {
  session: Session | null;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
}

export const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',
  '/admin/*',
  '/api/*',
];