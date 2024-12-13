import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionne l'abonnement ?",
    answer:
      "Notre abonnement vous donne accès à l'ensemble du contenu de notre magazine, en version numérique et/ou papier selon la formule choisie. Vous pouvez modifier ou annuler votre abonnement à tout moment.",
  },
  {
    question: "Puis-je changer de formule d'abonnement ?",
    answer:
      "Oui, vous pouvez changer de formule à tout moment. La différence de prix sera calculée au prorata de la période restante.",
  },
  {
    question: "Comment accéder au contenu numérique ?",
    answer:
      "Après votre inscription, vous recevrez vos identifiants par email. Vous pourrez alors accéder à tout le contenu via notre site web ou notre application mobile.",
  },
  {
    question: "La livraison est-elle incluse ?",
    answer:
      "Oui, la livraison est incluse dans tous nos abonnements incluant la version papier. Nous livrons partout en France métropolitaine.",
  },
  {
    question: "Quelle est la politique de remboursement ?",
    answer:
      "Nous offrons une garantie satisfait ou remboursé de 30 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.",
  },
  {
    question: "Les webinaires sont-ils enregistrés ?",
    answer:
      "Oui, tous nos webinaires sont enregistrés et disponibles en replay pour nos abonnés Premium+.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
