-- AlterTable
ALTER TABLE "entries" ADD COLUMN     "accountId" TEXT;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
