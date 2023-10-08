-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" TEXT NOT NULL,
    "productSku" TEXT NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "colorId" TEXT NOT NULL,
    "gender" "Gender",
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "genders" "Gender"[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("sku")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSize" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductColor" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStock" (
    "sku" TEXT NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "colorId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("sku","sizeId","colorId")
);

-- CreateTable
CREATE TABLE "_ProductToProductSize" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToProductColor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "ProductItem_productSku_idx" ON "ProductItem"("productSku");

-- CreateIndex
CREATE INDEX "ProductItem_sizeId_idx" ON "ProductItem"("sizeId");

-- CreateIndex
CREATE INDEX "ProductItem_colorId_idx" ON "ProductItem"("colorId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_typeId_idx" ON "Product"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_value_key" ON "ProductType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSize_value_key" ON "ProductSize"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ProductColor_value_key" ON "ProductColor"("value");

-- CreateIndex
CREATE INDEX "ProductStock_sku_idx" ON "ProductStock"("sku");

-- CreateIndex
CREATE INDEX "ProductStock_sizeId_idx" ON "ProductStock"("sizeId");

-- CreateIndex
CREATE INDEX "ProductStock_colorId_idx" ON "ProductStock"("colorId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductSize_AB_unique" ON "_ProductToProductSize"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductSize_B_index" ON "_ProductToProductSize"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductColor_AB_unique" ON "_ProductToProductColor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductColor_B_index" ON "_ProductToProductColor"("B");
