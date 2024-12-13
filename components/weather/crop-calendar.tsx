"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Calendar } from "lucide-react";

interface CropCalendarProps {
  location: string;
}

// Mock data pour les cultures
const crops = [
  {
    id: "maize",
    name: "Maïs",
    seasons: [
      {
        name: "Principale",
        plantingStart: "Mars",
        plantingEnd: "Avril",
        harvestStart: "Juillet",
        harvestEnd: "Août",
        conditions: [
          "Température: 25-30°C",
          "Pluviométrie: 500-800mm",
          "Sol bien drainé",
        ],
      },
      {
        name: "Secondaire",
        plantingStart: "Août",
        plantingEnd: "Septembre",
        harvestStart: "Décembre",
        harvestEnd: "Janvier",
        conditions: [
          "Température: 22-28°C",
          "Pluviométrie: 400-600mm",
          "Sol bien drainé",
        ],
      },
    ],
  },
  {
    id: "rice",
    name: "Riz",
    seasons: [
      {
        name: "Unique",
        plantingStart: "Mai",
        plantingEnd: "Juin",
        harvestStart: "Septembre",
        harvestEnd: "Octobre",
        conditions: [
          "Température: 22-35°C",
          "Pluviométrie: >1200mm",
          "Sol inondé",
        ],
      },
    ],
  },
  // ... autres cultures
];

export function CropCalendar({ location }: CropCalendarProps) {
  const [selectedCrop, setSelectedCrop] = useState(crops[0].id);

  const crop = crops.find((c) => c.id === selectedCrop);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[200px]">
            <Leaf className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sélectionner une culture" />
          </SelectTrigger>
          <SelectContent>
            {crops.map((crop) => (
              <SelectItem key={crop.id} value={crop.id}>
                {crop.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {crop && (
        <div className="grid gap-6 md:grid-cols-2">
          {crop.seasons.map((season, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Saison {season.name}
                  </h3>
                  <Badge variant="outline">
                    <Calendar className="mr-1 h-3 w-3" />
                    {season.plantingStart} - {season.harvestEnd}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Période de Plantation
                    </p>
                    <p className="text-lg font-medium">
                      {season.plantingStart} - {season.plantingEnd}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Période de Récolte
                    </p>
                    <p className="text-lg font-medium">
                      {season.harvestStart} - {season.harvestEnd}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Conditions Optimales
                    </p>
                    <ul className="space-y-1">
                      {season.conditions.map((condition, i) => (
                        <li key={i} className="text-sm">
                          • {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
