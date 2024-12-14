"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', mangues: 4000, tomates: 2400, maïs: 2400 },
  { date: 'Fév', mangues: 3000, tomates: 1398, maïs: 2210 },
  { date: 'Mar', mangues: 2000, tomates: 9800, maïs: 2290 },
  { date: 'Avr', mangues: 2780, tomates: 3908, maïs: 2000 },
  { date: 'Mai', mangues: 1890, tomates: 4800, maïs: 2181 },
  { date: 'Jun', mangues: 2390, tomates: 3800, maïs: 2500 },
  { date: 'Jul', mangues: 3490, tomates: 4300, maïs: 2100 },
];

export function MarketTrends() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tendances du Marché</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mangues" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="tomates" stroke="#82ca9d" />
              <Line type="monotone" dataKey="maïs" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
