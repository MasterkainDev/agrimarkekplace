"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/lib/animations";
import {
  Ticket,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface TicketCategory {
  name: string;
  tickets: number;
}

interface SupportStats {
  totalTickets: number;
  openTickets: number;
  avgResponseTime: string;
  satisfactionRate: number;
  ticketsByCategory: TicketCategory[];
  loading: boolean;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
}

function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <motion.div
      variants={slideUp}
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="p-6 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          {icon}
        </div>
        <div className="flex items-baseline space-x-2">
          <h2 className="text-3xl font-bold">{value}</h2>
          {trend && (
            <span
              className={`text-sm ${
                trend.value >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export function SupportStats() {
  const [stats, setStats] = useState<SupportStats>({
    totalTickets: 0,
    openTickets: 0,
    avgResponseTime: "0h",
    satisfactionRate: 0,
    ticketsByCategory: [],
    loading: true,
  });

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setStats({
        totalTickets: 156,
        openTickets: 23,
        avgResponseTime: "2h",
        satisfactionRate: 94,
        ticketsByCategory: [
          {
            name: "Technique",
            tickets: 45,
          },
          {
            name: "Paiement",
            tickets: 32,
          },
          {
            name: "Livraison",
            tickets: 28,
          },
          {
            name: "Produit",
            tickets: 25,
          },
          {
            name: "Autre",
            tickets: 26,
          },
        ],
        loading: false,
      });
    }, 1000);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="space-y-8"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total des tickets"
          value={stats.totalTickets}
          description="Tickets créés ce mois"
          icon={<Ticket className="h-4 w-4 text-primary" />}
          trend={{ value: 12, label: "vs mois dernier" }}
        />
        <StatsCard
          title="Tickets ouverts"
          value={stats.openTickets}
          description="Tickets en attente"
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
          trend={{ value: -5, label: "vs mois dernier" }}
        />
        <StatsCard
          title="Temps de réponse"
          value={stats.avgResponseTime}
          description="Temps moyen de réponse"
          icon={<Clock className="h-4 w-4 text-primary" />}
          trend={{ value: -15, label: "plus rapide" }}
        />
        <StatsCard
          title="Satisfaction"
          value={`${stats.satisfactionRate}%`}
          description="Taux de satisfaction client"
          icon={<CheckCircle2 className="h-4 w-4 text-primary" />}
          trend={{ value: 2, label: "vs mois dernier" }}
        />
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">
              Répartition des tickets par catégorie
            </h3>
            <p className="text-sm text-muted-foreground">
              Distribution des tickets sur les 30 derniers jours
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.ticketsByCategory}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="tickets"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
