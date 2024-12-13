"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const categories = [
  { id: "all", label: "All Articles" },
  { id: "agriculture", label: "Agriculture" },
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "sustainability", label: "Sustainability" },
];

export function CategoryTabs() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}