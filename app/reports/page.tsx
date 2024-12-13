"use client";

import { useState } from "react";
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
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { SalesReport } from "@/components/reports/sales-report";
import { InventoryReport } from "@/components/reports/inventory-report";
import { CustomerReport } from "@/components/reports/customer-report";
import { DateRangePicker } from "@/components/reports/date-range-picker";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("7d");

  const getReportComponent = () => {
    switch (reportType) {
      case "sales":
        return <SalesReport dateRange={dateRange} />;
      case "inventory":
        return <InventoryReport dateRange={dateRange} />;
      case "customers":
        return <CustomerReport dateRange={dateRange} />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rapports</h1>
            <p className="text-muted-foreground">
              Analysez les performances de votre entreprise
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DateRangePicker
              value={dateRange}
              onValueChange={setDateRange}
            />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter PDF
            </Button>
          </div>
        </div>

        {/* Types de rapports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className={`p-6 cursor-pointer transition-colors ${
              reportType === "sales"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setReportType("sales")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-background/10 rounded-full">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Rapport des Ventes</h3>
                <p className="text-sm opacity-90">
                  Analyse des ventes et revenus
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-6 cursor-pointer transition-colors ${
              reportType === "inventory"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setReportType("inventory")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-background/10 rounded-full">
                <PieChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Rapport d'Inventaire</h3>
                <p className="text-sm opacity-90">
                  État des stocks et mouvements
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-6 cursor-pointer transition-colors ${
              reportType === "customers"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setReportType("customers")}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-background/10 rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Rapport Clients</h3>
                <p className="text-sm opacity-90">
                  Analyse du comportement client
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contenu du rapport */}
        <Card className="p-6">
          {getReportComponent()}
        </Card>
      </div>
    </div>
  );
}
