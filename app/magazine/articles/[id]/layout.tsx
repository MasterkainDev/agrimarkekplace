// Mock articles pour generateStaticParams
const mockArticles = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
];

export function generateStaticParams() {
  // Dans un cas réel, ces IDs viendraient de la base de données ou du CMS
  return mockArticles.map((article) => ({
    id: article.id,
  }));
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
