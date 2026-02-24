import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phoneNumber: z.string().optional(),
  country: z.string().min(2, "Country of residence is required."),
});
