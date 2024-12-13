// Mock blog posts pour generateStaticParams
const mockPosts = [
  { slug: "impact-agriculture-numerique-afrique" },
  { slug: "innovations-agritech-2024" },
  { slug: "financement-agricole-afrique-ouest" },
  { slug: "durabilite-agriculture-moderne" },
  { slug: "transformation-digitale-agriculture" },
];

export function generateStaticParams() {
  // Dans un cas réel, ces slugs viendraient de la base de données ou du CMS
  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
