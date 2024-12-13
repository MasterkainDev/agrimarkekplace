import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Data - AgriMag",
  description: "Real-time agricultural market data and commodity prices",
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
    </div>
  );
}