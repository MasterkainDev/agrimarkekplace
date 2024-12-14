"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    name: "Questions Générales",
    questions: [
      {
        id: "q1",
        question: "Comment fonctionne AgriMarketplace ?",
        answer: "AgriMarketplace est une plateforme qui met en relation directe les agriculteurs et les acheteurs. Les agriculteurs peuvent lister leurs produits, et les acheteurs peuvent les acheter directement. Nous facilitons tout le processus, de la commande à la livraison.",
      },
      {
        id: "q2",
        question: "Comment puis-je devenir vendeur ?",
        answer: "Pour devenir vendeur, vous devez créer un compte professionnel et fournir les documents nécessaires (identification, documents agricoles, etc.). Une fois validé, vous pourrez commencer à vendre vos produits sur la plateforme.",
      },
    ],
  },
  {
    id: "orders",
    name: "Commandes et Livraisons",
    questions: [
      {
        id: "q3",
        question: "Quels sont les délais de livraison ?",
        answer: "Les délais de livraison varient selon votre localisation et le type de produit. En général, nous livrons entre 24h et 72h après la commande. Vous pouvez suivre votre commande en temps réel dans votre espace client.",
      },
      {
        id: "q4",
        question: "Comment puis-je suivre ma commande ?",
        answer: "Vous pouvez suivre votre commande dans la section 'Mes Commandes' de votre compte. Vous recevrez également des notifications par email à chaque étape importante de la livraison.",
      },
    ],
  },
  {
    id: "payment",
    name: "Paiement et Prix",
    questions: [
      {
        id: "q5",
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les cartes bancaires (Visa, Mastercard) et le paiement à la livraison. Pour les gros volumes, nous proposons également des solutions de paiement personnalisées.",
      },
      {
        id: "q6",
        question: "Comment sont fixés les prix ?",
        answer: "Les prix sont fixés par les agriculteurs eux-mêmes, en fonction du marché et de leurs coûts de production. Nous encourageons des prix équitables qui profitent à la fois aux agriculteurs et aux consommateurs.",
      },
    ],
  },
  {
    id: "quality",
    name: "Qualité et Garanties",
    questions: [
      {
        id: "q7",
        question: "Comment garantissez-vous la qualité des produits ?",
        answer: "Nous travaillons uniquement avec des agriculteurs certifiés et vérifions régulièrement la qualité des produits. Tous les produits sont inspectés avant l'expédition et nous offrons une garantie satisfaction.",
      },
      {
        id: "q8",
        question: "Que faire si je ne suis pas satisfait de ma commande ?",
        answer: "Si vous n'êtes pas satisfait, contactez-nous dans les 24h suivant la réception. Nous examinerons votre cas et vous proposerons un remboursement ou un remplacement selon la situation.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Centre d'Aide</h1>
          <p className="text-muted-foreground">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="flex w-full max-w-lg mx-auto items-center space-x-2 mb-8">
          <Input
            type="search"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Catégories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            Toutes les questions
          </Button>
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Questions et Réponses */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id}>
              {(selectedCategory === "all" || selectedCategory === category.id) && (
                <>
                  <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                  <Accordion type="single" collapsible className="mb-8">
                    {category.questions.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-6 border rounded-lg bg-muted/50 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-muted-foreground mb-4">
            Notre équipe de support est là pour vous aider
          </p>
          <Button asChild>
            <a href="/contact">Contacter le Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
