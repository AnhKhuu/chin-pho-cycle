export type TVariantItem = {
  id: number;
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
  sortBy: string | null;
};

export type TQueryParamsList = {
  type: string | undefined;
  brand: string | undefined;
  gender: string | undefined;
};

export type TSort = {
  value: string;
  label: string;
};

export type TProductItem = {
  availableSizes: string[];
  brandId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  brand: TBrandItem;
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
  id: number;
  size: string;
  quantity: number;
  variantId: number;
};

export type TBrandItem = {
  id: number;
  name_vi: string;
  name_en: string;
  description_en: string;
  description_vi: string;
  images: string[];
  logos: string[];
  isFeatured: boolean;
};

export type TCollectionItem = {
  id: number;
  name_vi: string;
  name_en: string;
  description_en: string;
  description_vi: string;
  images: string;
};

export type THighlightItem = {
  id: number;
  resourceUrl: string;
  name_en: string;
  name_vi: string;
  description_en: string;
  description_vi: string;
  titleImages: string[];
  bannerImages: string[];
  bannerVideos: string[];
  bannerVideoExternalUrl: string;
  isBannerVideoExternal: boolean;
};

export type TCategoryItem = {
  id: number;
  name_en: string;
  name_vi: string;
  types: TTypeItem[];
  featuredBrands: TBrandItem[];
  featuredCollections: TCollectionItem[];
  images: string[];
  products: TProductItem[];
  isFeatured: boolean;
};

export type TTypeItem = {
  id: number;
  name_en: string;
  name_vi: string;
  images: string[];
  isFeatured: boolean;
};

export enum TFilterType {
  TYPES = 'types',
  BRANDS = 'brands',
  GENDERS = 'genders',
  SIZES = 'sizes',
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
