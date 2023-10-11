/*
  Warnings:

  - You are about to drop the column `image` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `ProductItem` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `ProductItem` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `ProductItem` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `ProductType` table. All the data in the column will be lost.
  - You are about to drop the `ProductColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToProductColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToProductSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stock` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'Unisex';

-- DropIndex
DROP INDEX "ProductItem_colorId_idx";

-- DropIndex
DROP INDEX "ProductItem_sizeId_idx";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "sizes" "Size"[];

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "colorId",
DROP COLUMN "images",
DROP COLUMN "sizeId",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "size" "Size",
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductType" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "ProductColor";

-- DropTable
DROP TABLE "ProductSize";

-- DropTable
DROP TABLE "ProductStock";

-- DropTable
DROP TABLE "_ProductToProductColor";

-- DropTable
DROP TABLE "_ProductToProductSize";
