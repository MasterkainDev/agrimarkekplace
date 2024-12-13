import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Contracts - AgriMag",
  description: "Create and manage win-win partnerships effortlessly",
};

export default function ContractsLayout({
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