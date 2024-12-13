"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PRODUCT_CATEGORIES } from "@/lib/types/product";

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
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {PRODUCT_CATEGORIES.map((category) => (
        <motion.div key={category.id} variants={item}>
          <Link href={`/shop/categories/${category.id}`}>
            <Card className="overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}