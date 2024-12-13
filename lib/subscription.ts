import { z } from 'zod';

export const listingPlans = [
  {
    id: 'basic',
    name: 'Basic Listing',
    duration: '2 weeks',
    price: 29.99,
    originalPrice: 39.99,
    features: [
      'Single listing',
      'Basic visibility',
      'Standard support',
      'Email notifications',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    duration: '1 month',
    price: 49.99,
    originalPrice: 69.99,
    features: [
      'Up to 5 listings',
      'Featured placement',
      'Priority support',
      'Analytics dashboard',
      'Email and SMS notifications',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    duration: '3 months',
    price: 129.99,
    originalPrice: 179.99,
    features: [
      'Up to 15 listings',
      'Premium placement',
      'Dedicated support',
      'Advanced analytics',
      'Marketing tools',
      'API access',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    duration: '6 months',
    price: 249.99,
    originalPrice: 349.99,
    features: [
      'Unlimited listings',
      'Global visibility',
      'Custom solutions',
      'Account manager',
      'Premium analytics',
      'White-label options',
    ],
  },
];

export const subscriptionSchema = z.object({
  planId: z.string(),
  paymentMethod: z.enum(['card', 'bank', 'crypto']),
  billingCycle: z.enum(['monthly', 'quarterly', 'biannual']),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;