"use client";

import { Card } from "@/components/ui/card";
import { FileText, Warehouse, HandshakeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Activity = {
  id: number;
  type: "contract" | "farm" | "partnership";
  title: string;
  description: string;
  timestamp: string;
};

const activities: Activity[] = [
  {
    id: 1,
    type: "contract",
    title: "New Contract Created",
    description: "Farm lease agreement with AgriCorp Ltd",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "farm",
    title: "Farm Listing Updated",
    description: "Updated details for Green Valley Estate",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "partnership",
    title: "Partnership Request",
    description: "New partnership proposal from Local Cooperative",
    timestamp: "1 day ago",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "contract":
      return FileText;
    case "farm":
      return Warehouse;
    case "partnership":
      return HandshakeIcon;
    default:
      return FileText;
  }
};

export function RecentActivity() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/activity">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}