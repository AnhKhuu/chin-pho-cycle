export interface IProductItem {
  id: string;
  productName: string;
  imageUrl: string;
  price: string;
  colors: string[];
  color: string;
  sizes: string[];
}

export interface IProductImage {
  idx: string;
  url: string;
  alt?: string;
}
