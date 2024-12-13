"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomerReportProps {
  dateRange: string;
}

// Mock data pour les statistiques clients
const customerStats = {
  totalCustomers: 245,
  newCustomers: 28,
  activeCustomers: 180,
  averageOrderValue: 125000,
};

// Mock data pour l'activité des clients
const customerActivity = [
  { month: "Jan", nouveaux: 20, actifs: 150, inactifs: 30 },
  { month: "Fév", nouveaux: 25, actifs: 160, inactifs: 25 },
  { month: "Mar", nouveaux: 30, actifs: 170, inactifs: 20 },
  { month: "Avr", nouveaux: 22, actifs: 165, inactifs: 28 },
  { month: "Mai", nouveaux: 28, actifs: 180, inactifs: 15 },
  { month: "Jun", nouveaux: 35, actifs: 190, inactifs: 10 },
];

// Mock data pour les meilleurs clients
const topCustomers = [
  {
    id: 1,
    name: "Jean Kouassi",
    avatar: "/avatars/jean.jpg",
    totalOrders: 45,
    totalSpent: 2500000,
    lastOrder: "2024-12-10",
    status: "vip",
  },
  {
    id: 2,
    name: "Marie Koffi",
    avatar: "/avatars/marie.jpg",
    totalOrders: 38,
    totalSpent: 1800000,
    lastOrder: "2024-12-09",
    status: "regular",
  },
  {
    id: 3,
    name: "Ibrahim Diallo",
    avatar: "/avatars/ibrahim.jpg",
    totalOrders: 32,
    totalSpent: 1500000,
    lastOrder: "2024-12-08",
    status: "regular",
  },
];

export function CustomerReport({ dateRange }: CustomerReportProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="space-y-8">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Total Clients
            </p>
            <p className="text-2xl font-bold">{customerStats.totalCustomers}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Nouveaux Clients
            </p>
            <p className="text-2xl font-bold">{customerStats.newCustomers}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Clients Actifs
            </p>
            <p className="text-2xl font-bold">{customerStats.activeCustomers}</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Panier Moyen
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(customerStats.averageOrderValue)}
            </p>
          </div>
        </Card>
      </div>

      {/* Graphique d'activité client */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Activité des Clients</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="nouveaux"
                name="Nouveaux Clients"
                fill="hsl(var(--primary))"
              />
              <Bar
                dataKey="actifs"
                name="Clients Actifs"
                fill="hsl(var(--success))"
              />
              <Bar
                dataKey="inactifs"
                name="Clients Inactifs"
                fill="hsl(var(--muted))"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Meilleurs clients */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Meilleurs Clients</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Commandes</TableHead>
              <TableHead className="text-right">Total Dépensé</TableHead>
              <TableHead>Dernière Commande</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={customer.status === "vip" ? "default" : "secondary"}
                  >
                    {customer.status === "vip" ? "VIP" : "Régulier"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {customer.totalOrders}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(customer.totalSpent)}
                </TableCell>
                <TableCell>{formatDate(customer.lastOrder)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
