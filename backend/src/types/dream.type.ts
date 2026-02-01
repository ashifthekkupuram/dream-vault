type MOODS =
  | 'Scary'
  | 'Anxious'
  | 'Sad'
  | 'Angry'
  | 'Confusing'
  | 'Peaceful'
  | 'Happy'
  | 'Exciting'
  | 'Calm'
  | 'Neutral'
  | 'Weird'
  | 'Empowering'
  | 'Loving'
  | 'Nostalgic'
  | 'Curious';

export type DreamBodyType = {
  content: string;
  tags?: string[] | null | undefined;
  isLucid?: boolean | undefined;
  dreamedOn?: Date | undefined;
  emotion: string;
  mood: MOODS | null | undefined;
};
