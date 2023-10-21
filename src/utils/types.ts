export type TProductItem = {
  id: string;
  productName: string;
  imageUrl: string;
  price: string;
  colors: string[];
  color: string;
  sizes: string[];
};

export type TBrandItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type TSubCategoryItem = {
  id: string;
  value: string;
};

export type TCategoryItem = {
  id: string;
  value: string;
  subCategories: TSubCategoryItem[];
};
