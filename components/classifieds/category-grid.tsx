"use client";

import { Card } from "@/components/ui/card";
import { categories } from "@/lib/classifieds";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon, Building, Tractor, Wheat } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  building: Building,
  tractor: Tractor,
  wheat: Wheat,
};

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CategoryGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Building;
        
        return (
          <motion.div key={category.id} variants={item}>
            <Link href={`/classifieds/categories/${category.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.subcategories.join(', ')}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}