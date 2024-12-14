"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              AgriMarketplace
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/market"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/market" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Marché
            </Link>
            <Link
              href="/products"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/products" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Produits
            </Link>
            <Link
              href="/articles"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/articles" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Articles
            </Link>
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              )}
            >
              À propos
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Ajouter la recherche ici si nécessaire */}
          </div>
          <nav className="flex items-center">
            {user ? (
              <UserNav user={user} />
            ) : (
              <Button asChild variant="ghost">
                <Link href="/auth/signin">
                  Se connecter
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}