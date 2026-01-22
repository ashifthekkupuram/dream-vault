CREATE TYPE "public"."mood" AS ENUM('Scary', 'Anxious', 'Sad', 'Angry', 'Confusing', 'Peaceful', 'Happy', 'Exciting', 'Calm', 'Neutral', 'Weird', 'Empowering', 'Loving', 'Nostalgic', 'Curious');--> statement-breakpoint
CREATE TABLE "dream" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"tags" text[] DEFAULT '{}',
	"isLucid" boolean DEFAULT false NOT NULL,
	"dreamedOn" timestamp DEFAULT now() NOT NULL,
	"mood" "mood",
	"emotion" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dream" ADD CONSTRAINT "dream_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "dream_user_id_idx" ON "dream" USING btree ("userId");