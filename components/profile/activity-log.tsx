"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "login" | "profile_update" | "security_update" | "subscription";
  description: string;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "login",
    description: "Logged in from Chrome on MacOS",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "profile_update",
    description: "Updated profile information",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    type: "security_update",
    description: "Enabled two-factor authentication",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "4",
    type: "subscription",
    description: "Renewed premium subscription",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];

export function ActivityLog() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Activity Log</h3>
          <p className="text-sm text-muted-foreground">
            Recent activity on your account
          </p>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <Badge
                  variant={
                    activity.type === "security_update"
                      ? "destructive"
                      : activity.type === "subscription"
                      ? "default"
                      : "secondary"
                  }
                >
                  {activity.type.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}