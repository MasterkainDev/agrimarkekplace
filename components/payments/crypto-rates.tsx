"use client";

import { Card } from "@/components/ui/card";
import { Bitcoin, ArrowUp, ArrowDown } from "lucide-react";

const cryptoRates = [
  {
    name: "Bitcoin",
    price: "45,230.00",
    change: "+2.5%",
    positive: true,
  },
  {
    name: "Ethereum",
    price: "2,890.00",
    change: "-1.2%",
    positive: false,
  },
];

export function CryptoRates() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Bitcoin className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Crypto Rates</h2>
        </div>
        <div className="space-y-4">
          {cryptoRates.map((crypto) => (
            <div
              key={crypto.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{crypto.name}</p>
                <p className="text-2xl font-bold">${crypto.price}</p>
              </div>
              <div className={`flex items-center ${
                crypto.positive ? "text-green-500" : "text-red-500"
              }`}>
                {crypto.positive ? (
                  <ArrowUp className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDown className="mr-1 h-4 w-4" />
                )}
                {crypto.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}