"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Search,
  Menu,
  X,
  BookOpen,
  Warehouse,
  HandshakeIcon,
  LayoutDashboard,
  Newspaper,
  Bitcoin,
  TrendingUp,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const mainNav = [
  {
    name: "Magazine",
    icon: BookOpen,
    href: "/magazine",
    description: "Premium agricultural insights and analysis",
    badge: "Pro",
  },
  {
    name: "Farms",
    icon: Warehouse,
    href: "/farms",
    description: "Browse and list agricultural properties",
  },
  {
    name: "Market",
    icon: TrendingUp,
    href: "/market",
    description: "Real-time agricultural market data",
  },
  {
    name: "Blog",
    icon: Newspaper,
    href: "/blog",
    description: "Latest African economic news and opportunities",
  },
  {
    name: "Payments",
    icon: Bitcoin,
    href: "/payments",
    description: "Secure payments with crypto and traditional methods",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    children: React.ReactNode;
    badge?: string;
  }
>(({ className, title, children, badge, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none">{title}</div>
            {badge && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {badge}
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">AgriMag</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {mainNav.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px]">
                      <ListItem
                        href={item.href}
                        title={item.name}
                        badge={item.badge}
                      >
                        {item.description}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Button
          variant="ghost"
          className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </Button>

        {isOpen && (
          <div className="absolute inset-x-0 top-16 bg-background border-b md:hidden">
            <div className="space-y-1 px-4 py-2">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="relative h-9 w-full md:w-40 lg:w-64">
              <Search className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline-flex">Search...</span>
              <span className="inline-flex lg:hidden">Search</span>
            </Button>
          </div>
          <ModeToggle />
          <Button asChild variant="default">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}