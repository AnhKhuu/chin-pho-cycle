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
};

export type TQueryParamsList = {
  type: string | undefined;
  brand: string | undefined;
  gender: string | undefined;
};

export type TProductItem = {
  allSizes: string[];
  brandId: number;
  collectionId: number;
  description_en: string;
  description_vi: string;
  gender: string;
  id: string;
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
  imageUrl: string;
};

export type TCollectionItem = {
  id: string;
  name_vi: string;
  name_en: string;
  description_en: string;
  description_vi: string;
  imageUrl: string;
};

export type TCategoryItem = {
  id: string;
  name_en: string;
  name_vi: string;
  types: TTypeItem[];
};

export type TTypeItem = {
  id: string;
  name_en: string;
  name_vi: string;
};

export type TCategoryCardItem = {
  id: string;
  imageUrl: string;
  title: string;
};

export enum TFilterType {
  TYPES = 'types',
  BRANDS = 'brands',
  GENDERS = 'genders',
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
  column?: string;
  order?: 'asc' | 'desc';
};

export type TProductVariantFilters = TSortAndPaginationValues & {
  name_en?: string;
  name_vi?: string;
  price_from?: number;
  price_to?: number;
  genders?: Gender[];
  typeIds?: number[];
  brandIds?: number[];
};

export enum Gender {
  Male = 'M',
  Female = 'F',
  Unisex = 'U',
}
