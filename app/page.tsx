"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Warehouse, HandshakeIcon } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const features = [
    {
      title: "Digital Magazine",
      description: "Access curated content about agriculture, economy, and business",
      Icon: BookOpen,
      href: "/magazine",
    },
    {
      title: "Farm Listings",
      description: "Connect with farm owners and explore agricultural opportunities",
      Icon: Warehouse,
      href: "/farms",
    },
    {
      title: "Smart Contracts",
      description: "Create and manage win-win partnerships effortlessly",
      Icon: HandshakeIcon,
      href: "/contracts",
    },
  ];

  return (
    <div className="w-full">
      <HeroSection />
      
      <div className="container px-4 py-16 md:px-6 md:py-24">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
                <div>
                  <feature.Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                </div>
                <Button asChild variant="link" className="mt-auto p-0">
                  <Link href={feature.href}>
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}