"use client";

import { motion } from "framer-motion";
import { listingPlans } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export default function ListingPlansPage() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Listing Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan to showcase your agricultural listings and reach more potential buyers
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {listingPlans.map((plan, index) => {
          const discount = Math.round(
            ((plan.originalPrice - plan.price) / plan.originalPrice) * 100
          );

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative p-6 h-full flex flex-col">
                {index === 1 && (
                  <Badge
                    className="absolute -top-2 right-4"
                    variant="default"
                  >
                    Most Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.duration} duration
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      /{plan.duration.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm line-through text-muted-foreground">
                      ${plan.originalPrice}
                    </span>
                    <Badge variant="secondary" className="ml-2">
                      Save {discount}%
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Need a custom plan? <Button variant="link">Contact our sales team</Button>
        </p>
      </div>
    </div>
  );
}