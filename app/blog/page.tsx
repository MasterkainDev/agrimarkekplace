"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPostGrid } from "@/components/blog/blog-post-grid";
import { BlogCategories } from "@/components/blog/blog-categories";
import { Separator } from "@/components/ui/separator";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">African Economic Insights</h1>
          <p className="text-muted-foreground">
            Discover opportunities and stay informed about African markets
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary/40 text-white">
            <div className="p-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Featured Analysis</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold">
                Emerging Agricultural Technologies in Africa: 2024 Outlook
              </h2>
              <p className="mt-2 max-w-2xl">
                Explore how technological innovations are transforming African agriculture
                and creating new investment opportunities.
              </p>
              <Button variant="secondary" className="mt-4">
                Read Analysis
              </Button>
            </div>
          </Card>
        </motion.div>

        <Separator />
        <BlogCategories />
        <BlogPostGrid />
      </motion.div>
    </div>
  );
}