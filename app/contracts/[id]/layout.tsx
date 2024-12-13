// Mock contracts pour generateStaticParams
const mockContracts = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
];

export function generateStaticParams() {
  // Dans un cas réel, ces IDs viendraient de la base de données
  return mockContracts.map((contract) => ({
    id: contract.id,
  }));
}

export default function ContractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
