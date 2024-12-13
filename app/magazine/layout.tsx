import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magazine - AgriMag",
  description: "Discover the latest insights in agriculture, business, and technology",
};

export default function MagazineLayout({
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