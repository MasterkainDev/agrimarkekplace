"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

const weatherData = {
  current: {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partiellement nuageux",
  },
  forecast: [
    { day: "Lun", temp: 29, icon: Sun },
    { day: "Mar", temp: 27, icon: CloudRain },
    { day: "Mer", temp: 28, icon: Cloud },
    { day: "Jeu", temp: 30, icon: Sun },
  ],
};

export function WeatherWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Météo Locale</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <Cloud className="h-12 w-12 mx-auto text-blue-500" />
            <h3 className="text-2xl font-bold mt-2">{weatherData.current.temp}°C</h3>
            <p className="text-muted-foreground">{weatherData.current.condition}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{weatherData.current.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{weatherData.current.humidity}%</span>
            </div>
          </div>

          <div className="border-t w-full pt-4">
            <div className="grid grid-cols-4 gap-2">
              {weatherData.forecast.map((day) => {
                const Icon = day.icon;
                return (
                  <div key={day.day} className="text-center">
                    <p className="text-sm text-muted-foreground">{day.day}</p>
                    <Icon className="h-4 w-4 mx-auto my-1" />
                    <p className="text-sm font-medium">{day.temp}°</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
