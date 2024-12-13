"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Cloud, Droplets, Wind, Sun } from "lucide-react";
import { WeatherForecast } from "@/components/weather/weather-forecast";
import { WeatherAlerts } from "@/components/weather/weather-alerts";
import { CropCalendar } from "@/components/weather/crop-calendar";
import type { WeatherAlert } from "@/components/weather/weather-alerts";

// Mock data pour la météo
const weatherData = {
  current: {
    location: "Yamoussoukro",
    temperature: 28,
    humidity: 75,
    windSpeed: 12,
    condition: "Partiellement nuageux",
    rainfall: 0,
  },
  forecast: [
    {
      day: "Aujourd'hui",
      maxTemp: 30,
      minTemp: 22,
      condition: "Ensoleillé",
      rainfall: 0,
    },
    {
      day: "Demain",
      maxTemp: 29,
      minTemp: 21,
      condition: "Nuageux",
      rainfall: 20,
    },
    // ... autres jours
  ],
  alerts: [
    {
      type: "warning" as const,
      title: "Risque de Sécheresse",
      description: "Prévoyez l'irrigation pour les 5 prochains jours",
      date: "2024-12-15",
    },
    {
      type: "info" as const,
      title: "Conditions Favorables",
      description: "Période idéale pour la plantation du maïs",
      date: "2024-12-12",
    },
  ] satisfies WeatherAlert[],
};

export default function WeatherPage() {
  const [location, setLocation] = useState("Yamoussoukro");

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Météo Agricole</h1>
            <p className="text-muted-foreground">
              Prévisions et conseils agricoles personnalisés
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une localité..."
                className="pl-8 w-[250px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Ma Position
            </Button>
          </div>
        </div>

        {/* Météo actuelle */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-lg font-medium">{weatherData.current.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-4xl font-bold">
                  {weatherData.current.temperature}°C
                </span>
              </div>
              <p className="text-muted-foreground">{weatherData.current.condition}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Humidité</p>
                  <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Vent</p>
                  <p className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Cloud className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Précipitations</p>
                  <p className="text-2xl font-bold">{weatherData.current.rainfall} mm</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Prévisions et Alertes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Prévisions sur 7 Jours</h2>
              <WeatherForecast forecast={weatherData.forecast} />
            </Card>
          </div>
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Alertes Météo</h2>
              <WeatherAlerts alerts={weatherData.alerts} />
            </Card>
          </div>
        </div>

        {/* Calendrier Agricole */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Calendrier Agricole</h2>
          <CropCalendar location={location} />
        </Card>
      </div>
    </div>
  );
}
