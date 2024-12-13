import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - AgriMag",
  description: "Your personalized agricultural dashboard",
};

export default function DashboardLayout({
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