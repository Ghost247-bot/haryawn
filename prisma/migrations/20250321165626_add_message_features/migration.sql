-- AlterTable
ALTER TABLE "Message" ADD COLUMN "attachments" JSONB;
ALTER TABLE "Message" ADD COLUMN "reactions" JSONB;
ALTER TABLE "Message" ADD COLUMN "status" TEXT DEFAULT 'sent';
