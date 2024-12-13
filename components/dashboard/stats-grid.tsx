"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                "bg-primary/10"
              )}
            >
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span
              className={cn(
                "text-sm font-medium",
                stat.trend === "up" ? "text-success" : "text-destructive"
              )}
            >
              {stat.change}
            </span>
            <span className="text-sm text-muted-foreground">
              vs période précédente
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
