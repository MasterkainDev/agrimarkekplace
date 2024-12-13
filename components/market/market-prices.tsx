import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

const prices = [
  {
    commodity: "Coffee (Arabica)",
    price: "$4.25/lb",
    change: "+2.5%",
    positive: true,
  },
  {
    commodity: "Cocoa Beans",
    price: "$3,450/MT",
    change: "+5.2%",
    positive: true,
  },
  {
    commodity: "Cotton",
    price: "$0.85/lb",
    change: "-1.2%",
    positive: false,
  },
  {
    commodity: "Palm Oil",
    price: "$1,120/MT",
    change: "+0.8%",
    positive: true,
  },
  {
    commodity: "Corn",
    price: "$6.75/bushel",
    change: "-0.5%",
    positive: false,
  },
];

export function MarketPrices() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Commodity Prices</h2>
        <div className="space-y-4">
          {prices.map((item) => (
            <div
              key={item.commodity}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{item.commodity}</p>
                <p className="text-2xl font-bold">{item.price}</p>
              </div>
              <Badge
                variant={item.positive ? "default" : "destructive"}
                className="flex items-center space-x-1"
              >
                {item.positive ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                <span>{item.change}</span>
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}