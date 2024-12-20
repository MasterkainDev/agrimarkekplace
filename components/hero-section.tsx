"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative w-full">
      {/* Hero Image */}
      <div className="absolute inset-0 rounded-bl-[50px] rounded-br-[50px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"
          alt="Modern African Agriculture"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="container px-4 py-24 md:py-32 lg:py-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Transformons l'Agriculture Africaine
            </h1>
            <p className="text-lg text-gray-200 md:text-xl">
              Connectez-vous avec les agriculteurs, découvrez des opportunités et restez informé
              des dernières innovations agricoles à travers l'Afrique.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/market">
                  Explorer le Marché <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                <Link href="/articles">
                  Voir les Articles <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}