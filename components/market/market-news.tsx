import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const news = [
  {
    title: "Global Coffee Prices Surge on Supply Concerns",
    time: "2 hours ago",
    category: "Coffee",
    link: "/market/news/coffee-prices",
  },
  {
    title: "African Cotton Exports Show Strong Growth",
    time: "5 hours ago",
    category: "Cotton",
    link: "/market/news/cotton-exports",
  },
  {
    title: "New Trade Agreement Boosts Cocoa Markets",
    time: "1 day ago",
    category: "Cocoa",
    link: "/market/news/cocoa-trade",
  },
  {
    title: "Palm Oil Production Forecast Updated",
    time: "1 day ago",
    category: "Palm Oil",
    link: "/market/news/palm-oil",
  },
];

export function MarketNews() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Market News</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/market/news">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {item.time}
                </div>
              </div>
              <Link
                href={item.link}
                className="block font-medium hover:underline"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}