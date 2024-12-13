import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Truck, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Listez vos produits",
    description: "Créez facilement des annonces pour vos produits agricoles",
  },
  {
    icon: Users,
    title: "Touchez plus d'acheteurs",
    description: "Accédez à une large base d'acheteurs qualifiés",
  },
  {
    icon: TrendingUp,
    title: "Prix du marché",
    description: "Suivez les tendances des prix en temps réel",
  },
  {
    icon: Truck,
    title: "Gestion logistique",
    description: "Solutions de livraison intégrées pour vos produits",
  },
];

export default function SellPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Vendez vos produits agricoles
        </h1>
        <p className="text-xl text-muted-foreground">
          Rejoignez notre marketplace et atteignez des milliers d'acheteurs potentiels
        </p>
        <Button size="lg" className="mt-8">
          Commencer à vendre
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Prêt à développer votre activité ?
        </h2>
        <p className="text-muted-foreground mb-6">
          Inscrivez-vous gratuitement et commencez à vendre vos produits dès aujourd'hui
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">En savoir plus</Button>
          <Button>S'inscrire maintenant</Button>
        </div>
      </div>
    </div>
  );
}
