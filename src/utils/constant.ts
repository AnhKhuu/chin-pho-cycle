export enum Routes {
  HOME = '/',
  SEARCH = '/search',
  PRODUCT = '/products',
}

export enum AdminRoutes {
  BRAND = '/admin/brands',
  CATEGORY = '/admin/categories',
}

export enum QueryKeys {
  BRANDS = 'brands',
  CATEGORIES = 'categories',
  CATEGORY = 'category',
  SUB_CATEGORIES = 'sub-categories',
  SUB_CATEGORY = 'sub-category',
}

export enum PrivateApi {
  BRANDS = '/api/brands',
  CATEGORIES = '/api/categories',
  SUB_CATEGORIES = '/api/sub-categories',
}

export enum PublicApi {
  BRANDS = '/api/public/brands',
  CATEGORIES = '/api/public/categories',
  SUB_CATEGORIES = '/api/public/sub-categories',
}
