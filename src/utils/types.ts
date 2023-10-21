export interface IProductItem {
  id: string;
  productName: string;
  imageUrl: string;
  price: string;
  colors: string[];
  color: string;
  sizes: string[];
}

export type BrandItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type SubCategoryItem = {
  id: string;
  value: string;
};

export type CategoryItem = {
  id: string;
  value: string;
  subCategories: SubCategoryItem[];
};
