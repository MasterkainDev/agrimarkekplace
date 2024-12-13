import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  phone: z.string().optional(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactForm) {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form submitted:", data);
      resolve({ success: true });
    }, 1000);
  });
}
