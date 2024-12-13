"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

type ContractStatus = {
  name: string;
  value: number;
  color: string;
};

const data: ContractStatus[] = [
  { name: "Active", value: 12, color: "hsl(var(--chart-1))" },
  { name: "Pending", value: 5, color: "hsl(var(--chart-2))" },
  { name: "Draft", value: 3, color: "hsl(var(--chart-3))" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-2">
        <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex justify-center gap-4">
    {payload.map((entry: any, index: number) => (
      <div key={`legend-${index}`} className="flex items-center">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm">{entry.value}</span>
      </div>
    ))}
  </div>
);

export function ContractOverview() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Contract Overview</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/contracts">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.map((status) => (
          <div key={status.name} className="text-center">
            <p className="text-2xl font-bold">{status.value}</p>
            <p className="text-sm text-muted-foreground">{status.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}