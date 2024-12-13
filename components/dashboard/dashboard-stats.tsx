import { Card } from "@/components/ui/card";
import { TrendingUp, Users, FileText, Sprout } from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: TrendingUp,
  },
  {
    name: "Active Contracts",
    value: "12",
    change: "+4",
    icon: FileText,
  },
  {
    name: "Farm Partners",
    value: "2,338",
    change: "+180",
    icon: Users,
  },
  {
    name: "Cultivated Area",
    value: "450 ha",
    change: "+50 ha",
    icon: Sprout,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{stat.value}</h3>
              <p className="mt-1 text-sm text-green-600">{stat.change}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}