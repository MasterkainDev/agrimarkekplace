"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Sun, Cloud, CloudRain } from "lucide-react";

interface ForecastDay {
  day: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  rainfall: number;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

export function WeatherForecast({ forecast }: WeatherForecastProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "ensoleillé":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "nuageux":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "pluvieux":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {forecast.map((day, index) => (
        <Card key={index} className="bg-card">
          <CardContent className="p-4 text-center space-y-2">
            <p className="font-medium">{day.day}</p>
            {getWeatherIcon(day.condition)}
            <div className="space-y-1">
              <p className="text-sm font-medium">{day.maxTemp}°C</p>
              <p className="text-sm text-muted-foreground">{day.minTemp}°C</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {day.rainfall > 0 ? `${day.rainfall}mm` : "Pas de pluie"}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
