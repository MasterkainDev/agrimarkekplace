import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AgriMarketplace</h3>
            <p className="text-sm text-muted-foreground">
              Votre source principale pour l'agriculture et le commerce agricole en Afrique.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/market" className="hover:underline">Marché</Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">Produits</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:underline">Articles</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">À propos</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:underline">Tableau de bord</Link>
              </li>
              <li>
                <Link href="/orders" className="hover:underline">Mes commandes</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">Panier</Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:underline">Favoris</Link>
              </li>
              <li>
                <Link href="/settings" className="hover:underline">Paramètres</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Aide & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Nous contacter</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">Politique de confidentialité</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">Conditions d'utilisation</Link>
              </li>
            </ul>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input placeholder="Votre email" type="email" />
                <Button>S'abonner</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:space-y-0 md:text-left">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} AgriMarketplace. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:underline">Confidentialité</Link>
            <Link href="/terms" className="hover:underline">Conditions</Link>
            <Link href="/cookies" className="hover:underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}