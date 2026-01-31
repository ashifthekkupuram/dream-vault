import z from "zod";

export const MoodsEnum = z.enum(
  [
    "Scary",
    "Anxious",
    "Sad",
    "Angry",
    "Confusing",
    "Peaceful",
    "Happy",
    "Exciting",
    "Calm",
    "Neutral",
    "Weird",
    "Empowering",
    "Loving",
    "Nostalgic",
    "Curious",
  ],
  "Mood is required",
);

export const dreamScheme = z.object({
  title: z
    .string()
    .min(8, "Minimum 8 Characters required")
    .max(50, "Maximum 50 Chararacters"),
  content: z.string().min(30, "Minimum 30 Characters required"),
  tags: z.string().array().min(1, "Minimum 1 tag is required"),
  isLucid: z.boolean(),
  mood: MoodsEnum,
  dreamedOn: z.date(),
  emotion: z
    .string()
    .min(3, "Minimum 3 Characters required")
    .max(15, "Maximum 15 Chararacters"),
});
