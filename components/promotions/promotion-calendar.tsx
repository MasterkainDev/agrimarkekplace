import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface PromotionCalendarProps {
  status: "all" | "active" | "scheduled" | "expired"
}

export function PromotionCalendar({ status }: PromotionCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Card>
  );
}
