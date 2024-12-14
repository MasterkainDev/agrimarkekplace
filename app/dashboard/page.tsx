import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ContractOverview } from "@/components/dashboard/contract-overview";
import { MarketTrends } from "@/components/dashboard/market-trends";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { ProductInventory } from "@/components/dashboard/product-inventory";
import { Plus, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
            <p className="text-muted-foreground">
              Bienvenue ! Voici un aperçu de vos activités agricoles
            </p>
          </div>
          <div className="flex gap-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un Produit
            </Button>
            <Button variant="outline">
              Voir les Analyses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-2">
            <MarketTrends />
          </Card>
          <Card>
            <WeatherWidget />
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <ContractOverview />
        </div>

        <Card>
          <ProductInventory />
        </Card>
      </div>
    </div>
  );
}