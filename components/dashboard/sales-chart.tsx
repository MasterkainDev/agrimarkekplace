"use client";

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock data pour le graphique
const data = [
  { date: "Jan", sales: 1200000 },
  { date: "Fév", sales: 1900000 },
  { date: "Mar", sales: 1500000 },
  { date: "Avr", sales: 2100000 },
  { date: "Mai", sales: 1800000 },
  { date: "Jun", sales: 2500000 },
];

export function SalesChart() {
  const formatValue = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="date"
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
            tickFormatter={formatValue}
          />
          <Tooltip
            formatter={(value: number) => [`${formatValue(value)} FCFA`, "Ventes"]}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
