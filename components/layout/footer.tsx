"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image
            src="/logo.svg"
            alt="AgriMarketplace Logo"
            width={120}
            height={30}
            className="h-6 w-auto"
          />
          <p className="text-center text-sm leading-loose md:text-left">
            2024 AgriMarketplace. Tous droits réservés.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:ml-auto">
          <nav className="flex gap-4">
            <Link href="/about" className="text-sm hover:underline underline-offset-4">
              À propos
            </Link>
            <Link href="/contact" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-sm hover:underline underline-offset-4">
              CGU
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}