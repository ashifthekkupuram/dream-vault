import z from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  name: z.string().min(4, "Name must have 4 characters"),
  email: z.email(),
  password: z.string().min(8, "Password must have 8 characters"),
});