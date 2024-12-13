"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp,
  Sprout,
  DollarSign,
  Globe,
  Lightbulb,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Market Trends",
    icon: TrendingUp,
  },
  {
    name: "Innovation",
    icon: Lightbulb,
  },
  {
    name: "Investment",
    icon: DollarSign,
  },
  {
    name: "Sustainability",
    icon: Sprout,
  },
  {
    name: "Global Trade",
    icon: Globe,
  },
  {
    name: "Policy",
    icon: Scale,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function BlogCategories() {
  return (
    <ScrollArea className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex space-x-4 p-1"
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={item}>
            <Button
              variant="outline"
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
}