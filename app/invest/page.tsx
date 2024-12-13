import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Timer, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { InvestmentImage } from "@/components/investments/investment-image";

const investmentOpportunities = [
  {
    title: "Ferme Bio Expansion",
    description: "Expansion d'une ferme biologique existante avec mise en place de nouvelles serres et systèmes d'irrigation durables",
    amount: "50,000€",
    raised: "35,000€",
    investors: 45,
    return: "12%",
    duration: "24 mois",
    risk: "Modéré",
    category: "Agriculture Bio",
    location: "Provence-Alpes-Côte d'Azur",
    impact: ["Biodiversité", "Emploi local", "Circuit court"],
    image: "/images/farm-1.jpg"
  },
  {
    title: "Projet Aquaponie",
    description: "Installation d'un système d'aquaponie innovant combinant élevage de poissons et culture de légumes",
    amount: "75,000€",
    raised: "25,000€",
    investors: 28,
    return: "15%",
    duration: "36 mois",
    risk: "Élevé",
    category: "Innovation",
    location: "Bretagne",
    impact: ["Innovation", "Économie d'eau", "Production durable"],
    image: "/images/farm-2.jpg"
  },
  {
    title: "Coopérative Agricole",
    description: "Participation dans une coopérative agricole locale spécialisée dans les fruits et légumes biologiques",
    amount: "25,000€",
    raised: "20,000€",
    investors: 65,
    return: "8%",
    duration: "12 mois",
    risk: "Faible",
    category: "Coopérative",
    location: "Occitanie",
    impact: ["Solidarité", "Agriculture locale", "Développement rural"],
    image: "/images/farm-3.jpg"
  },
];

const stats = [
  { label: "Projets financés", value: "150+", icon: PieChart },
  { label: "Retour moyen", value: "11.5%", icon: TrendingUp },
  { label: "Investisseurs", value: "2,500+", icon: Users },
  { label: "Durée moyenne", value: "24 mois", icon: Timer },
];

export default function InvestPage() {
  return (
    <div className="container py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Investissez dans l'Agriculture Durable</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Participez à la transformation de l'agriculture tout en générant des rendements attractifs
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Investment Opportunities */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Opportunités d'Investissement</h2>
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="innovation">Innovation</TabsTrigger>
              <TabsTrigger value="cooperative">Coopérative</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {investmentOpportunities.map((opportunity) => (
            <Card key={opportunity.title} className="overflow-hidden group">
              <InvestmentImage
                src={opportunity.image}
                alt={opportunity.title}
              />
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{opportunity.category}</Badge>
                    <Badge variant="outline">{opportunity.location}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    {opportunity.description}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progression</span>
                    <span className="font-medium">{opportunity.raised} / {opportunity.amount}</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{opportunity.investors} investisseurs</span>
                    <span>70%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y">
                  <div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Retour estimé</span>
                    </div>
                    <div className="font-semibold text-green-600">{opportunity.return}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      <span className="text-sm">Durée</span>
                    </div>
                    <div className="font-semibold">{opportunity.duration}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Niveau de risque</span>
                  </div>
                  <div className="flex gap-2">
                    {opportunity.impact.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Investir maintenant</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
