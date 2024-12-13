// Mock classifieds pour generateStaticParams
const mockClassifieds = [
  { id: "1" }, // Tracteur agricole
  { id: "2" }, // Semences de maïs
  { id: "3" }, // Système d'irrigation
  { id: "4" }, // Engrais bio
  { id: "5" }, // Matériel de récolte
  { id: "6" }, // Serre tunnel
  { id: "7" }, // Stockage grain
  { id: "8" }, // Outils manuels
  { id: "9" }, // Pesticides naturels
  { id: "10" }, // Équipement élevage
];

export function generateStaticParams() {
  // Dans un cas réel, ces IDs viendraient de la base de données
  return mockClassifieds.map((classified) => ({
    id: classified.id,
  }));
}

export default function ClassifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
