import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Notre Mission pour l'Agriculture Africaine
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nous construisons une plateforme qui connecte les agriculteurs, les investisseurs et les acheteurs pour créer un écosystème agricole plus durable et équitable.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
          <p className="text-muted-foreground">
            Transformer l'agriculture africaine en créant un marché numérique qui permet aux agriculteurs d'accéder à de meilleures opportunités et aux investisseurs de participer à la croissance du secteur.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
          <p className="text-muted-foreground">
            Fournir une plateforme technologique innovante qui simplifie les transactions agricoles, favorise les investissements durables et soutient le développement des communautés rurales.
          </p>
        </Card>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { number: "1000+", label: "Agriculteurs" },
          { number: "500+", label: "Investisseurs" },
          { number: "€2M+", label: "Transactions" },
          { number: "10", label: "Pays" },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Équipe</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Fondatrice",
              image: "/team/sarah.jpg",
            },
            {
              name: "David Kouamé",
              role: "Directeur des Opérations",
              image: "/team/david.jpg",
            },
            {
              name: "Aisha Diallo",
              role: "Responsable Développement",
              image: "/team/aisha.jpg",
            },
          ].map((member) => (
            <Card key={member.name} className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/10" />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Rejoignez-nous dans cette aventure
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Que vous soyez agriculteur, investisseur ou simplement intéressé par notre mission, nous serions ravis d'échanger avec vous.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">Nous contacter</Button>
          <Button>Rejoindre la plateforme</Button>
        </div>
      </div>
    </div>
  );
}
