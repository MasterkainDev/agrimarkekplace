"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WeatherAlert {
  type: "warning" | "info";
  title: string;
  description: string;
  date: string;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          variant={alert.type === "warning" ? "destructive" : "default"}
          className={cn(
            "border-l-4",
            alert.type === "warning"
              ? "border-l-destructive"
              : "border-l-primary"
          )}
        >
          <div className="flex items-start space-x-2">
            {alert.type === "warning" ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <Info className="h-4 w-4" />
            )}
            <div className="flex-1">
              <AlertTitle className="flex items-center justify-between">
                {alert.title}
                <span className="text-sm font-normal text-muted-foreground">
                  {formatDate(alert.date)}
                </span>
              </AlertTitle>
              <AlertDescription className="mt-1">
                {alert.description}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
}
