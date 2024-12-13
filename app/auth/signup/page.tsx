"use client";

import Link from "next/link";
import { AuthHeader } from "@/components/auth/auth-header";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <Card className="p-8">
      <AuthHeader
        title="Create an account"
        description="Enter your details below to create your account"
      />

      <SignUpForm />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <OAuthButtons />

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}