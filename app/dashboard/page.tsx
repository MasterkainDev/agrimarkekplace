import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ContractOverview } from "@/components/dashboard/contract-overview";

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your agricultural activities
            </p>
          </div>
        </div>
        <DashboardStats />
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <ContractOverview />
        </div>
      </div>
    </div>
  );
}