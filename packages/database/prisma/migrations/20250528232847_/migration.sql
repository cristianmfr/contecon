/*
  Warnings:

  - The `reminder_days_before` column on the `schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "reminder_days_before",
ADD COLUMN     "reminder_days_before" INTEGER DEFAULT 0;
