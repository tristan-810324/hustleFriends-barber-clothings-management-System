-- CreateTable
CREATE TABLE "StaffMessageReply" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffMessageId" TEXT NOT NULL,

    CONSTRAINT "StaffMessageReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StaffMessageReply_staffMessageId_createdAt_idx" ON "StaffMessageReply"("staffMessageId", "createdAt");

-- AddForeignKey
ALTER TABLE "StaffMessageReply" ADD CONSTRAINT "StaffMessageReply_staffMessageId_fkey" FOREIGN KEY ("staffMessageId") REFERENCES "StaffMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
