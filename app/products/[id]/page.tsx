import { ProductPageClient } from "./client-page";

// Simuler les données des produits
const products = [
  {
    id: 1,
    name: "Tomates Bio Premium",
    price: 2.5,
    unit: "kg",
    category: "Légumes",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    ],
    description: "Tomates biologiques cultivées localement, parfaites pour vos salades et sauces. Nos tomates sont cultivées sans pesticides et récoltées à maturité pour garantir un goût optimal.",
    specifications: {
      origine: "Dakar, Sénégal",
      certification: "Bio",
      conservation: "5-7 jours à température ambiante",
      calibre: "Moyen à gros",
    },
    stock: 100,
    rating: 4.5,
    reviews: 128,
    seller: {
      name: "Ferme Bio du Soleil",
      location: "Dakar, Sénégal",
      rating: 4.8,
      sales: 1500,
      joinedDate: "2022",
    },
  },
  {
    id: 2,
    name: "Mangues Kent",
    price: 3.0,
    unit: "kg",
    category: "Fruits",
    images: [
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
    ],
    description: "Mangues Kent juteuses et sucrées, idéales pour la consommation directe ou les jus",
    specifications: {
      origine: "Abidjan, Côte d'Ivoire",
      certification: "Standard",
      conservation: "3-5 jours à température ambiante",
      calibre: "Grand",
    },
    stock: 75,
    rating: 4.8,
    reviews: 95,
    seller: {
      name: "Vergers d'Abidjan",
      location: "Abidjan, Côte d'Ivoire",
      rating: 4.7,
      sales: 1200,
      joinedDate: "2023",
    },
  },
  {
    id: 3,
    name: "Maïs Blanc Premium",
    price: 1.8,
    unit: "kg",
    category: "Céréales",
    images: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop",
    ],
    description: "Maïs blanc de haute qualité, parfait pour la farine ou la consommation directe",
    specifications: {
      origine: "Bamako, Mali",
      certification: "Standard",
      conservation: "Plusieurs mois au sec",
      calibre: "Moyen",
    },
    stock: 500,
    rating: 4.3,
    reviews: 75,
    seller: {
      name: "Coopérative du Mali",
      location: "Bamako, Mali",
      rating: 4.5,
      sales: 2500,
      joinedDate: "2021",
    },
  },
];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id)) || products[0];
  return <ProductPageClient product={product} />;
}
