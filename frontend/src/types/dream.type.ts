export type MoodType =
  | "Scary"
  | "Anxious"
  | "Sad"
  | "Angry"
  | "Confusing"
  | "Peaceful"
  | "Happy"
  | "Exciting"
  | "Calm"
  | "Neutral"
  | "Weird"
  | "Empowering"
  | "Loving"
  | "Nostalgic"
  | "Curious";

export type DreamType = {
  id: string;
  content: string;
  tags: string[];
  isLucid: boolean;
  dreamedOn: Date;
  mood: MoodType;
  emotion: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: any;
};

export const EMOJIES: Record<MoodType, string> = {
  Scary: "😱",
  Anxious: "😰",
  Sad: "😢",
  Angry: "😡",
  Confusing: "😕",
  Peaceful: "🕊️",
  Happy: "😄",
  Exciting: "🤩",
  Calm: "😌",
  Neutral: "😐",
  Weird: "🤪",
  Empowering: "💪",
  Loving: "❤️",
  Nostalgic: "🌅",
  Curious: "🧐",
};
