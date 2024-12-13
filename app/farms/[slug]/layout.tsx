// Mock farms pour generateStaticParams
const mockFarms = [
  { slug: "ferme-diallo" },
  { slug: "agriprocess-sa" },
  { slug: "eco-farm-senegal" },
  { slug: "green-valley-mali" },
  { slug: "bio-harvest-burkina" },
];

export function generateStaticParams() {
  // Dans un cas réel, ces slugs viendraient de la base de données
  return mockFarms.map((farm) => ({
    slug: farm.slug,
  }));
}

export default function FarmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
