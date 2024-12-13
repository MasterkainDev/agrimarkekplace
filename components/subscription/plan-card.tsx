"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    originalPrice: number;
  };
  isPopular?: boolean;
  onSelect: (planId: string) => void;
}

export function PlanCard({ plan, isPopular, onSelect }: PlanCardProps) {
  const discount = Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative p-6">
        {isPopular && (
          <Badge
            className="absolute -top-2 right-4"
            variant="default"
          >
            Most Popular
          </Badge>
        )}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {plan.description}
            </p>
          </div>

          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-sm text-muted-foreground ml-1">/month</span>
            <Badge variant="secondary" className="ml-2">
              Save {discount}%
            </Badge>
          </div>

          <div className="space-y-2">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button
            className="w-full"
            variant={isPopular ? "default" : "outline"}
            onClick={() => onSelect(plan.id)}
          >
            Get Started
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}