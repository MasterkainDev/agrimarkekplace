import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FeaturedArticle } from "@/components/magazine/featured-article";
import { ArticleGrid } from "@/components/magazine/article-grid";
import { CategoryTabs } from "@/components/magazine/category-tabs";

export default function MagazinePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Magazine</h1>
          <p className="text-muted-foreground">
            Discover the latest insights in agriculture, business, and technology
          </p>
        </div>
        <Separator />
        <FeaturedArticle />
        <CategoryTabs />
        <ArticleGrid />
      </div>
    </div>
  );
}