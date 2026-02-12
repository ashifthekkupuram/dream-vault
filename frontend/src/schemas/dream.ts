import z from "zod";

import HTMLTagsRemover from "../utils/html-tags-remover";

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
  content: z.string().refine((value) => {
    const refinedValue = HTMLTagsRemover(value);
    return refinedValue.length >= 100;
  }, "Minimum 100 Characters required"),
  tags: z.string().array().min(1, "Minimum 1 tag is required"),
  isLucid: z.boolean(),
  mood: MoodsEnum,
  dreamedOn: z.date(),
  emotion: z
    .string()
    .min(3, "Minimum 3 Characters required")
    .max(15, "Maximum 15 Chararacters"),
});
