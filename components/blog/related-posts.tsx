"use client";

import { BlogPost } from "./blog-post";

interface RelatedPostsProps {
  currentSlug: string;
}

export function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  // Dans un cas réel, nous ferions un appel API pour récupérer les articles connexes
  const relatedPosts = [
    {
      title: "Les Meilleures Pratiques pour l'Agriculture Durable",
      excerpt: "Découvrez comment adopter des méthodes d'agriculture durables...",
      slug: "meilleures-pratiques-agriculture-durable",
      coverImage: "/images/blog/sustainable-farming.jpg",
      category: "Agriculture Durable",
      author: {
        name: "Marie Martin",
        image: "/images/avatars/marie.jpg",
      },
      publishedAt: "8 Dec 2023",
      readingTime: "4 min",
    },
    {
      title: "Innovation dans l'Irrigation Agricole",
      excerpt: "Les nouvelles technologies transforment l'irrigation...",
      slug: "innovation-irrigation-agricole",
      coverImage: "/images/blog/irrigation-tech.jpg",
      category: "Innovation",
      author: {
        name: "Paul Dubois",
        image: "/images/avatars/paul.jpg",
      },
      publishedAt: "5 Dec 2023",
      readingTime: "6 min",
    },
  ].filter(post => post.slug !== currentSlug);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Articles Connexes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.map((post) => (
          <BlogPost key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
