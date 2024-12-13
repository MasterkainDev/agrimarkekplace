"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    title: "Shop",
    href: "/shop",
    description: "Browse our marketplace for agricultural products and services",
    subItems: [
      {
        title: "All Products",
        href: "/shop/products",
        description: "Browse all available agricultural products",
      },
      {
        title: "Categories",
        href: "/shop/categories",
        description: "Browse products by category",
      },
      {
        title: "Market Prices",
        href: "/market",
        description: "View current market prices",
      },
      {
        title: "Orders",
        href: "/orders",
        description: "View and manage your orders",
      }
    ]
  },
  {
    title: "Invest",
    href: "/invest",
    description: "Discover agricultural investment opportunities",
    subItems: [
      {
        title: "Investment Projects",
        href: "/invest/projects",
        description: "Browse current investment opportunities",
      },
      {
        title: "Farms",
        href: "/farms",
        description: "Explore farm investment opportunities",
      },
      {
        title: "Contracts",
        href: "/contracts",
        description: "View and manage investment contracts",
      }
    ]
  },
  {
    title: "Sell",
    href: "/sell",
    description: "List your products or services in our marketplace",
    subItems: [
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Manage your seller account",
      },
      {
        title: "Inventory",
        href: "/inventory",
        description: "Manage your product inventory",
      },
      {
        title: "Classifieds",
        href: "/classifieds",
        description: "Post and manage classified ads",
      },
      {
        title: "Promotions",
        href: "/promotions",
        description: "Create and manage promotions",
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Access helpful resources and information",
    subItems: [
      {
        title: "Weather",
        href: "/weather",
        description: "Check agricultural weather forecasts",
      },
      {
        title: "Magazine",
        href: "/magazine",
        description: "Read agricultural news and insights",
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Latest updates and articles",
      },
      {
        title: "Support",
        href: "/support",
        description: "Get help and support",
      }
    ]
  },
  {
    title: "Account",
    href: "/profile",
    description: "Manage your account settings",
    subItems: [
      {
        title: "Profile",
        href: "/profile",
        description: "View and edit your profile",
      },
      {
        title: "Messages",
        href: "/messages",
        description: "View your messages",
      },
      {
        title: "Notifications",
        href: "/notifications",
        description: "Manage your notifications",
      },
      {
        title: "Payments",
        href: "/payments",
        description: "Manage your payments",
      },
      {
        title: "Subscription",
        href: "/subscription",
        description: "Manage your subscription",
      },
      {
        title: "Reports",
        href: "/reports",
        description: "Access your reports and analytics",
      }
    ]
  },
  {
    title: "Subscription",
    href: "/subscription",
    description: "Access premium content and features",
    subItems: [
      {
        title: "Plans",
        href: "/subscription",
        description: "View our subscription plans",
      },
      {
        title: "Benefits",
        href: "/subscription#benefits",
        description: "Learn about subscription benefits",
      }
    ]
  }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              AgriMarketplace
            </span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-4">
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {item.subItems?.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={"/avatars/default.png"}
                      alt={user?.email || ""}
                    />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/login">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            className="md:hidden"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="container grid gap-y-4 py-4">
            {mainNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium",
                  pathname === item.href && "text-primary"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}