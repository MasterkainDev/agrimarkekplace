"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function DateRangePicker({
  value,
  onValueChange,
}: DateRangePickerProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <Calendar className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Sélectionner la période" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7d">7 derniers jours</SelectItem>
        <SelectItem value="30d">30 derniers jours</SelectItem>
        <SelectItem value="90d">90 derniers jours</SelectItem>
        <SelectItem value="6m">6 derniers mois</SelectItem>
        <SelectItem value="1y">Cette année</SelectItem>
        <SelectItem value="custom">Période personnalisée</SelectItem>
      </SelectContent>
    </Select>
  );
}
