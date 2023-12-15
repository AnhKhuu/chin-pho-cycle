export type TVariantItem = {
  id: string;
  images: string[];
  name_en: string;
  name_vi: string;
  product: TProductItem;
  productId: number;
  stocks: TStockItem[];
};

export type TInitialFilters = {
  types: string[] | undefined;
  brands: string[] | undefined;
  genders: string[] | undefined;
  sizes: string[] | undefined;
  sortBy: string | undefined;
};

export type TQueryParamsList = {
  type: string | undefined;
  brand: string | undefined;
  gender: string | undefined;
};

export type TProductItem = {
  availableSizes: string[];
  brandId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  brand: {
    name_vi: string;
    name_en: string;
  };
  description_en: string;
  description_vi: string;
  gender: string;
  id: number;
  name_en: string;
  name_vi: string;
  price: number;
  typeId: number;
  variants: TVariantItem[];
};

export type TStockItem = {
  id: string;
  size: string;
  quantity: number;
  variantId: string;
};

export type TBrandItem = {
  id: string;
  name_vi: string;
  name_en: string;
  description_en: string;
  description_vi: string;
  images: string[];
};

export type TCollectionItem = {
  id: string;
  name_vi: string;
  name_en: string;
  description_en: string;
  description_vi: string;
  images: string;
};

export type TCategoryItem = {
  id: string;
  name_en: string;
  name_vi: string;
  types: TTypeItem[];
  featuredBrands: TBrandItem[];
  featuredCollections: TCollectionItem[];
  images: string[];
  products: TProductItem[];
};

export type TTypeItem = {
  id: string;
  name_en: string;
  name_vi: string;
  images: string[];
};

export enum TFilterType {
  TYPES = 'types',
  BRANDS = 'brands',
  GENDERS = 'genders',
  SIZES = 'sizes'
}

export type TFilterItem = {
  filterType: TFilterType;
  title: string;
  fields: {
    value: string;
    label: string;
  }[];
};

export type TSortAndPaginationValues = {
  offset: number;
  limit: number;
  column: string;
  order: 'asc' | 'desc';
};

export type TProductVariantFilters = TSortAndPaginationValues & {
  name_en?: string;
  name_vi?: string;
  genders?: Gender[];
  sizes?: Size[];
  isFeatured?: boolean;
  typeIds?: number[];
  brandIds?: number[];
  collectionIds?: number[];
  categoryId?: number;
  productId?: number;
};

export enum Gender {
  Male = 'M',
  Female = 'F',
  Unisex = 'U',
}

export enum Size {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}
