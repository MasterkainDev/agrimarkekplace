"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, HelpCircle, ArrowRight } from "lucide-react";

const searchResults = [
  {
    category: "FAQ",
    items: [
      {
        title: "Comment créer un compte ?",
        link: "/support/faq#create-account",
      },
      {
        title: "Modes de paiement acceptés",
        link: "/support/faq#payment-methods",
      },
      {
        title: "Délais de livraison",
        link: "/support/faq#delivery-time",
      },
    ],
  },
  {
    category: "Guides",
    items: [
      {
        title: "Guide du vendeur",
        link: "/support/guides/seller",
      },
      {
        title: "Guide de l'acheteur",
        link: "/support/guides/buyer",
      },
      {
        title: "Sécurité des paiements",
        link: "/support/guides/payment-security",
      },
    ],
  },
  {
    category: "Articles",
    items: [
      {
        title: "Meilleures pratiques agricoles",
        link: "/blog/agricultural-best-practices",
      },
      {
        title: "Guide des saisons",
        link: "/blog/seasonal-guide",
      },
      {
        title: "Conseils de stockage",
        link: "/blog/storage-tips",
      },
    ],
  },
];

export function HelpSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredResults = query
    ? searchResults.map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter((category) => category.items.length > 0)
    : searchResults;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Comment pouvons-nous vous aider ?</h2>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher de l'aide..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setOpen(true)}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[520px] p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Rechercher de l'aide..."
                value={query}
                onValueChange={setQuery}
              />
              <CommandList>
                <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                {filteredResults.map((category) => (
                  <CommandGroup
                    key={category.category}
                    heading={category.category}
                  >
                    {category.items.map((item) => (
                      <CommandItem
                        key={item.link}
                        onSelect={() => {
                          // TODO: Implémenter la navigation
                          console.log(item.link);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{item.title}</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div>Recherches populaires :</div>
          <div>• Créer un compte</div>
          <div>• Modes de paiement</div>
          <div></div>
          <div>• Suivi de commande</div>
          <div>• Devenir vendeur</div>
        </div>
      </div>
    </Card>
  );
}
