"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const faqData = {
  general: [
    {
      question: "Comment créer un compte sur AgriMarketplace ?",
      answer:
        "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de la page. Remplissez le formulaire avec vos informations personnelles et suivez les instructions à l'écran.",
    },
    {
      question: "Comment modifier mes informations personnelles ?",
      answer:
        "Connectez-vous à votre compte, accédez aux paramètres du profil en cliquant sur votre avatar, puis sur 'Modifier le profil'. Vous pourrez y modifier vos informations personnelles.",
    },
    {
      question: "Comment contacter le support client ?",
      answer:
        "Vous pouvez nous contacter via le chat en direct, en créant un ticket de support, ou en utilisant le formulaire de contact. Notre équipe est disponible 7j/7 de 8h à 20h.",
    },
  ],
  commandes: [
    {
      question: "Comment passer une commande ?",
      answer:
        "Parcourez notre catalogue, ajoutez les produits souhaités au panier, puis cliquez sur 'Commander'. Suivez les étapes pour choisir le mode de livraison et de paiement.",
    },
    {
      question: "Comment suivre ma commande ?",
      answer:
        "Dans votre espace client, accédez à la section 'Mes commandes'. Vous y trouverez toutes vos commandes et leur statut en temps réel.",
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Les délais varient selon votre localisation et le mode de livraison choisi. En général, comptez 2-3 jours en ville et 3-5 jours en zone rurale.",
    },
  ],
  paiements: [
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les paiements par carte bancaire, mobile money (Orange Money, MTN Money), et virement bancaire. Pour les grands comptes, le paiement à la livraison est possible.",
    },
    {
      question: "Comment obtenir une facture ?",
      answer:
        "Les factures sont automatiquement générées et envoyées par email après chaque commande. Vous pouvez aussi les retrouver dans la section 'Mes factures' de votre compte.",
    },
    {
      question: "La transaction est-elle sécurisée ?",
      answer:
        "Oui, toutes nos transactions sont sécurisées avec un cryptage SSL. Nous ne stockons pas vos informations de paiement sensibles.",
    },
  ],
  produits: [
    {
      question: "Comment vérifier la qualité des produits ?",
      answer:
        "Tous nos produits sont certifiés et contrôlés. Vous pouvez consulter les avis des autres acheteurs et les certifications sur chaque fiche produit.",
    },
    {
      question: "Que faire en cas de produit défectueux ?",
      answer:
        "Contactez-nous dans les 48h suivant la réception. Notre politique de retour vous permet d'être remboursé ou de recevoir un nouveau produit.",
    },
    {
      question: "Comment devenir vendeur ?",
      answer:
        "Pour devenir vendeur, créez un compte professionnel et soumettez votre dossier. Notre équipe l'examinera sous 48h ouvrées.",
    },
  ],
};

export function FAQ() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="commandes">Commandes</TabsTrigger>
            <TabsTrigger value="paiements">Paiements</TabsTrigger>
            <TabsTrigger value="produits">Produits</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqData.general.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="commandes" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqData.commandes.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="paiements" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqData.paiements.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="produits" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqData.produits.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
