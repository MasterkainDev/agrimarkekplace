"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShoppingCart,
  Store,
  Truck,
  CreditCard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, slideUp } from "@/lib/animations";

const guides = {
  buyer: [
    {
      id: "getting-started",
      title: "Commencer",
      icon: BookOpen,
      sections: [
        {
          id: "create-account",
          title: "Créer un compte",
          content: `
Pour créer un compte sur AgriMarketplace :

1. Cliquez sur "S'inscrire" en haut à droite
2. Remplissez le formulaire avec vos informations
3. Vérifiez votre email
4. Complétez votre profil

Votre compte vous permettra de :
- Sauvegarder vos produits favoris
- Suivre vos commandes
- Accéder à votre historique d'achats
- Recevoir des notifications personnalisées
          `,
        },
        {
          id: "browse-products",
          title: "Parcourir les produits",
          content: `
Comment trouver les produits qui vous intéressent :

1. Utilisez la barre de recherche
2. Filtrez par catégorie
3. Triez par prix, popularité ou date
4. Consultez les détails du produit
5. Lisez les avis des autres acheteurs

Conseils de navigation :
- Utilisez les filtres avancés
- Sauvegardez vos recherches favorites
- Activez les alertes de prix
          `,
        },
      ],
    },
    {
      id: "ordering",
      title: "Commander",
      icon: ShoppingCart,
      sections: [
        {
          id: "place-order",
          title: "Passer une commande",
          content: `
Étapes pour passer une commande :

1. Ajoutez les produits au panier
2. Vérifiez votre panier
3. Choisissez le mode de livraison
4. Sélectionnez le mode de paiement
5. Confirmez la commande

Points importants :
- Vérifiez la disponibilité
- Consultez les frais de livraison
- Lisez les conditions de vente
          `,
        },
        {
          id: "payment",
          title: "Paiement",
          content: `
Modes de paiement acceptés :

- Mobile Money (Orange Money, MTN Mobile Money)
- Carte bancaire
- Paiement à la livraison (selon conditions)

Sécurité des paiements :
- Transactions cryptées
- Authentification à deux facteurs
- Protection contre la fraude
          `,
        },
      ],
    },
  ],
  seller: [
    {
      id: "seller-start",
      title: "Devenir vendeur",
      icon: Store,
      sections: [
        {
          id: "seller-registration",
          title: "Inscription vendeur",
          content: `
Comment devenir vendeur :

1. Créez un compte professionnel
2. Fournissez vos documents légaux
3. Configurez votre boutique
4. Ajoutez vos premiers produits

Documents requis :
- Identité professionnelle
- Registre de commerce
- Attestation fiscale
          `,
        },
        {
          id: "product-listing",
          title: "Lister des produits",
          content: `
Guide pour lister vos produits :

1. Photos de qualité
2. Description détaillée
3. Prix et stock
4. Conditions de vente
5. Options de livraison

Bonnes pratiques :
- Utilisez des mots-clés pertinents
- Mettez à jour régulièrement
- Répondez aux questions
          `,
        },
      ],
    },
  ],
};

export function UserGuide() {
  const [activeTab, setActiveTab] = useState("buyer");
  const [activeTopic, setActiveTopic] = useState("getting-started");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <Card className="p-6">
        <motion.div variants={slideUp} className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Guide d'utilisation
            </h2>
            <p className="text-muted-foreground">
              Apprenez à utiliser AgriMarketplace efficacement
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setActiveTopic(
                value === "buyer"
                  ? "getting-started"
                  : "seller-start"
              );
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Guide Acheteur
              </TabsTrigger>
              <TabsTrigger value="seller">
                <Store className="mr-2 h-4 w-4" />
                Guide Vendeur
              </TabsTrigger>
            </TabsList>

            {["buyer", "seller"].map((role) => (
              <TabsContent key={role} value={role}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideIn}
                  className="grid gap-6 md:grid-cols-[240px_1fr]"
                >
                  <nav className="flex flex-col space-y-2">
                    {guides[role as keyof typeof guides].map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <Button
                          key={topic.id}
                          variant={
                            activeTopic === topic.id
                              ? "secondary"
                              : "ghost"
                          }
                          className="justify-start"
                          onClick={() => setActiveTopic(topic.id)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {topic.title}
                        </Button>
                      );
                    })}
                  </nav>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTopic}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeIn}
                      className="space-y-4"
                    >
                      {guides[role as keyof typeof guides].map((topic) =>
                        topic.id === activeTopic ? (
                          <motion.div
                            key={topic.id}
                            variants={slideUp}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-medium">
                              {topic.title}
                            </h3>
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                            >
                              {topic.sections.map((section) => (
                                <AccordionItem
                                  key={section.id}
                                  value={section.id}
                                >
                                  <AccordionTrigger>
                                    {section.title}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="prose prose-sm max-w-none">
                                      <pre className="whitespace-pre-wrap font-sans">
                                        {section.content}
                                      </pre>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </motion.div>
                        ) : null
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </Card>
    </motion.div>
  );
}
