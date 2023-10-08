/*
  Warnings:

  - The primary key for the `ProductColor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductColor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `typeId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `colorId` on the `ProductItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `colorId` on the `ProductStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_ProductToProductColor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "typeId",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "colorId",
ADD COLUMN     "colorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductStock" DROP CONSTRAINT "ProductStock_pkey",
DROP COLUMN "colorId",
ADD COLUMN     "colorId" INTEGER NOT NULL,
ADD CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("sku", "sizeId", "colorId");

-- AlterTable
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ProductToProductColor" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TestObject" (
    "id" TEXT NOT NULL,
    "msg" TEXT NOT NULL,

    CONSTRAINT "TestObject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_typeId_idx" ON "Product"("typeId");

-- CreateIndex
CREATE INDEX "ProductItem_colorId_idx" ON "ProductItem"("colorId");

-- CreateIndex
CREATE INDEX "ProductStock_colorId_idx" ON "ProductStock"("colorId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductColor_AB_unique" ON "_ProductToProductColor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductColor_B_index" ON "_ProductToProductColor"("B");
