import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farm Listings - AgriMag",
  description: "Browse and list agricultural properties",
};

export default function FarmsLayout({
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