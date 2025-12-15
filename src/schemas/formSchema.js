import { z } from "zod";

// Rules for Phone (10 digits) and Password (Strong)
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Step 1: Personal Info
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  age: z.coerce.number().min(18, "You must be at least 18 years old"),
});

// Step 2: Address
export const addressSchema = z.object({
  street: z.string().min(5, "Street address is too short"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(4, "Invalid Zip Code"),
});

// Step 3: Account Creation
export const accountSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().regex(passwordRegex, "Password must have 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Shows error on the confirm field
});