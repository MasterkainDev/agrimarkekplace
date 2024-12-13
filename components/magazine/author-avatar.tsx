"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface AuthorAvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function AuthorAvatar({ src, name, size = "sm", showName = true }: AuthorAvatarProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const imageSizes = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  return (
    <motion.div 
      className="flex items-center space-x-2 group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Avatar className={`${sizeClasses[size]} relative overflow-hidden ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/20`}>
        {!imageError && (
          <div className={`absolute inset-0 ${!imageLoaded ? 'animate-pulse bg-muted' : ''}`}>
            <Image
              src={src}
              alt={name}
              width={imageSizes[size]}
              height={imageSizes[size]}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <AvatarFallback 
          className={`bg-primary/5 text-primary transition-opacity duration-300 ${
            imageError || !imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {name.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <motion.span 
          className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {name}
        </motion.span>
      )}
    </motion.div>
  );
}
