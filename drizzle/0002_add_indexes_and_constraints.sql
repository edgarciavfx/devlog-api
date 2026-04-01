-- Add indexes and fix constraints for logs table
-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS "logs_user_id_idx" ON "logs" ("user_id");
CREATE INDEX IF NOT EXISTS "logs_created_at_idx" ON "logs" ("created_at");

-- Backfill any NULL tags to empty array
UPDATE "logs" SET "tags" = '[]'::jsonb WHERE "tags" IS NULL;

-- Alter tags column to be NOT NULL
ALTER TABLE "logs" ALTER COLUMN "tags" SET DEFAULT '[]'::jsonb;
ALTER TABLE "logs" ALTER COLUMN "tags" SET NOT NULL;

-- Drop existing FK and recreate with CASCADE
ALTER TABLE "logs" DROP CONSTRAINT IF EXISTS "logs_user_id_users_id_fk";
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
