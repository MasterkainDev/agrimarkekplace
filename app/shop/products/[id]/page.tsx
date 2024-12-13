import { ProductView } from "./product-view";

// Mock data - à remplacer par les données réelles de la base de données
const mockProduct = {
  id: "1",
  name: "Premium Organic Fertilizer",
  price: 49.99,
  description: "High-quality organic fertilizer perfect for all types of crops. Made from natural ingredients and enriched with essential nutrients.",
  images: ["https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d"],
  category: "Fertilizers",
  rating: 4.5,
  reviews: 128,
  stock: 50,
  specifications: [
    { label: "Weight", value: "25 kg" },
    { label: "Type", value: "Organic" },
    { label: "NPK Ratio", value: "5-3-2" },
    { label: "Origin", value: "Local" },
  ],
};

export default async function ProductPage({ params }: { params: { id: string } }) {
  // TODO: Récupérer les données réelles du produit depuis la base de données
  const product = mockProduct;

  return <ProductView product={product} />;
}

export async function generateStaticParams() {
  // TODO: Récupérer tous les IDs de produits depuis la base de données
  return [{ id: "1" }];
}