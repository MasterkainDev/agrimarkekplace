"use client";

import Link from "next/link";
import { AuthHeader } from "@/components/auth/auth-header";
import { SignInForm } from "@/components/auth/sign-in-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card className="p-8">
      <AuthHeader
        title="Connexion"
        description="Entrez votre email pour vous connecter à votre compte"
      />

      <SignInForm />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>

      <OAuthButtons />

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Vous n'avez pas de compte ?{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          S'inscrire
        </Link>
      </p>
    </Card>
  );
}
