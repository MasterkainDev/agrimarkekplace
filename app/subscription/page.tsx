"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SubscriptionHero } from "@/components/subscription/subscription-hero";
import { PricingCard } from "@/components/subscription/pricing-card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const subscriptionPlans = [
  {
    name: "Pack Mensuel",
    price: "29,99€",
    description: "Idéal pour découvrir notre magazine",
    features: [
      "Accès au contenu numérique",
      "Magazine papier mensuel",
      "Articles premium",
      "Support standard",
    ],
    popular: false,
    image: "/images/subscription/plan-monthly.jpg",
  },
  {
    name: "Pack Annuel",
    price: "24,99€",
    description: "Notre meilleure offre",
    features: [
      "Tous les avantages du Pack Mensuel",
      "2 mois gratuits",
      "Accès aux archives",
      "Contenus exclusifs",
    ],
    popular: true,
    image: "/images/subscription/plan-yearly.jpg",
  },
  {
    name: "Pack Premium+",
    price: "39,99€",
    description: "Pour les professionnels exigeants",
    features: [
      "Tous les avantages du Pack Annuel",
      "Webinaires mensuels",
      "Support prioritaire",
      "Accès anticipé aux événements",
    ],
    popular: false,
    image: "/images/subscription/plan-premium.jpg",
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showNewsletter, setShowNewsletter] = useState(true);

  return (
    <div className="min-h-screen">
      <SubscriptionHero />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <section className="py-20 bg-primary/5 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">20K+</h3>
                <p className="text-muted-foreground">Abonnés actifs</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">150+</h3>
                <p className="text-muted-foreground">Articles par mois</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">98%</h3>
                <p className="text-muted-foreground">Taux de satisfaction</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">24/7</h3>
                <p className="text-muted-foreground">Support client</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choisissez votre formule</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des offres adaptées à tous les besoins, avec la flexibilité de changer à tout moment
            </p>
          </div>
          <div className="grid gap-8 lg:gap-12 md:grid-cols-3 items-start">
            {subscriptionPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                {...plan}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-20 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
            <div className="text-center">
              <div className="bg-background rounded-full p-4 mb-4 inline-block">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold">Paiement Sécurisé</h3>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-full p-4 mb-4 inline-block">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold">30 Jours Satisfait ou Remboursé</h3>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-full p-4 mb-4 inline-block">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold">Support Premium</h3>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-full p-4 mb-4 inline-block">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold">Annulation Facile</h3>
            </div>
          </div>
        </section>
      </div>

      {/* Newsletter Popup */}
      {showNewsletter && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-card p-6 rounded-lg shadow-lg border max-w-sm"
        >
          <button
            onClick={() => setShowNewsletter(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-semibold mb-2">Restez informé !</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Inscrivez-vous à notre newsletter et recevez un mois d'essai gratuit !
              </p>
              <Button size="sm">S'inscrire</Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}