"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", coffee: 4000, cocoa: 2400, cotton: 2400 },
  { name: "Feb", coffee: 3000, cocoa: 1398, cotton: 2210 },
  { name: "Mar", coffee: 2000, cocoa: 9800, cotton: 2290 },
  { name: "Apr", coffee: 2780, cocoa: 3908, cotton: 2000 },
  { name: "May", coffee: 1890, cocoa: 4800, cotton: 2181 },
  { name: "Jun", coffee: 2390, cocoa: 3800, cotton: 2500 },
];

const commodities = [
  { name: "Coffee", color: "hsl(var(--chart-1))" },
  { name: "Cocoa", color: "hsl(var(--chart-2))" },
  { name: "Cotton", color: "hsl(var(--chart-3))" },
];

const CustomXAxis = (props: any) => (
  <XAxis
    {...props}
    tick={{ fill: 'currentColor' }}
    tickLine={{ stroke: 'currentColor' }}
    axisLine={{ stroke: 'currentColor' }}
  />
);

const CustomYAxis = (props: any) => (
  <YAxis
    {...props}
    tick={{ fill: 'currentColor' }}
    tickLine={{ stroke: 'currentColor' }}
    axisLine={{ stroke: 'currentColor' }}
  />
);

export function MarketTrends() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Market Trends</h2>
          <div className="flex space-x-2">
            {commodities.map((commodity) => (
              <Button
                key={commodity.name}
                variant="outline"
                size="sm"
                className="h-8"
              >
                <div
                  className="mr-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: commodity.color }}
                />
                {commodity.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                opacity={0.2}
              />
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="coffee"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cocoa"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cotton"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}