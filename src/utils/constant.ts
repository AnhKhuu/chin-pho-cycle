export enum RouteTypes {
  HOME = '/',
  SEARCH = '/search',
  PRODUCT = '/products',
}

export enum AdminRouteTypes {
  CATEGORY = '/admin/categories',
  BRAND = '/admin/brands',
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
