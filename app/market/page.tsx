import { Card } from "@/components/ui/card";
import { MarketTrends } from "@/components/market/market-trends";
import { MarketPrices } from "@/components/market/market-prices";
import { MarketNews } from "@/components/market/market-news";
import { Separator } from "@/components/ui/separator";

export default function MarketPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Agricultural Market</h1>
          <p className="text-muted-foreground">
            Real-time market data and agricultural commodity prices
          </p>
        </div>

        <MarketTrends />
        <Separator />
        
        <div className="grid gap-6 md:grid-cols-2">
          <MarketPrices />
          <MarketNews />
        </div>
      </div>
    </div>
  );
}