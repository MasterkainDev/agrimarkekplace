"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Download,
} from "lucide-react";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ProductsTable } from "@/components/dashboard/products-table";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import type { Stat } from "@/components/dashboard/stats-grid";

// Mock data pour les statistiques
const stats: Stat[] = [
  {
    title: "Ventes Totales",
    value: "2.5M FCFA",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Clients",
    value: "145",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Commandes",
    value: "85",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Revenu Moyen",
    value: "29.4K FCFA",
    change: "-4.3%",
    trend: "down",
    icon: DollarSign,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tableau de Bord</h1>
            <p className="text-muted-foreground">
              Aperçu de vos performances commerciales
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="7d">
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Dernières 24 heures</SelectItem>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="90d">90 derniers jours</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Grille de statistiques */}
        <StatsGrid stats={stats} />

        {/* Graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Évolution des Ventes</h2>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Journalier</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SalesChart />
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Répartition des Ventes</h2>
                <Select defaultValue="category">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Par Catégorie</SelectItem>
                    <SelectItem value="product">Par Produit</SelectItem>
                    <SelectItem value="region">Par Région</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Ici, nous ajouterions un composant pour le graphique en camembert */}
            </div>
          </Card>
        </div>

        {/* Tableau des produits les plus vendus */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Produits les Plus Vendus</h2>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
            <ProductsTable />
          </div>
        </Card>
      </div>
    </div>
  );
}
