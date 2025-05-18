-- CreateTable
CREATE TABLE "Receipt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ref_num" TEXT NOT NULL,
    "tax_type" TEXT NOT NULL,
    "tax_ammount" INTEGER NOT NULL,
    "submission_date" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_ref_num_key" ON "Receipt"("ref_num");
