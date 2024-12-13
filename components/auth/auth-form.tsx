"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { signIn, signUp } from "@/lib/supabase";
import { AuthSchema, type AuthFormData } from "@/lib/auth";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
  });

  async function onSubmit(data: AuthFormData) {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) throw error;

      toast({
        title: isSignUp ? "Account created" : "Welcome back",
        description: isSignUp 
          ? "Please check your email to verify your account"
          : "You have successfully signed in",
      });

      if (!isSignUp) {
        router.push("/dashboard");
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Une erreur est survenue lors de l'authentification";
        
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp 
            ? "Enter your details to create your account" 
            : "Enter your credentials to sign in"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isSignUp ? "Create Account" : "Sign In"}
        </Button>
      </form>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp 
            ? "Already have an account? Sign in" 
            : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  );
}