import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  image: string;
  index: number;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  popular,
  image,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
          popular ? "border-primary shadow-lg scale-[1.02]" : ""
        }`}
      >
        {popular && (
          <div className="absolute -right-12 top-6 z-10 w-40 rotate-45 bg-primary py-1 text-center text-sm text-white">
            Populaire
          </div>
        )}
        
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={`${name} plan`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-2xl font-bold text-foreground">{name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-baseline gap-x-2">
            <span className="text-4xl font-bold">{price}</span>
            <span className="text-muted-foreground">/mois</span>
          </div>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            className={`mt-8 w-full transition-colors ${
              popular 
                ? "bg-primary hover:bg-primary/90" 
                : "bg-background hover:bg-muted"
            }`}
            variant={popular ? "default" : "outline"}
          >
            Choisir {name}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
