import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid work email"),
  agencyName: z.string().min(2, "Enter your agency name"),
  website: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\/.+\..+/.test(value), "Enter a valid website URL"),
  serviceNeeded: z.string().min(1, "Select a service"),
  monthlyVolume: z.string().min(1, "Select a monthly creative volume"),
  pricingInterest: z.string().min(1, "Select a pricing option"),
  preferredContact: z.string().min(1, "Select a preferred contact method"),
  message: z.string().min(10, "Tell us a bit more about the project"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
