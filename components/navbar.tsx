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
    // Récupérer l'utilisateur au chargement
    const fetchUser = async () => {
      try {
        const { data: { user: currentUser }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
          return;
        }
        console.log("Current user:", currentUser); // Pour le débogage
        setUser(currentUser);
      } catch (error) {
        console.error("Error in fetchUser:", error);
      }
    };

    fetchUser();

    // S'abonner aux changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session?.user); // Pour le débogage
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

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
          <nav className="flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">
                    Tableau de bord
                  </Link>
                </Button>
                <UserNav user={user} />
              </>
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