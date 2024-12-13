import { z } from 'zod';

export const categories = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'building',
    subcategories: ['Farms', 'Land', 'Agricultural Buildings'],
  },
  {
    id: 'equipment',
    name: 'Equipment',
    icon: 'tractor',
    subcategories: ['Machinery', 'Tools', 'Irrigation Systems'],
  },
  {
    id: 'livestock',
    name: 'Livestock',
    icon: 'cow',
    subcategories: ['Cattle', 'Poultry', 'Other Animals'],
  },
  {
    id: 'crops',
    name: 'Crops',
    icon: 'wheat',
    subcategories: ['Seeds', 'Harvested Crops', 'Plants'],
  },
] as const;

export const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string(),
  subcategory: z.string(),
  location: z.string(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;

export interface Listing extends ListingFormData {
  id: string;
  createdAt: string;
  userId: string;
  status: 'active' | 'pending' | 'expired';
  featured: boolean;
  views: number;
}