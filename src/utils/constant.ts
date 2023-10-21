export enum Routes {
  HOME = '/',
  SEARCH = '/search',
  PRODUCT = '/products',
}

export enum AdminRoutes {
  BRANDS = '/admin/brands',
  CATEGORIES = '/admin/categories',
}

export enum QueryKeys {
  BRANDS = 'brands',
  BRAND = 'brand',
  CATEGORIES = 'categories',
  CATEGORY = 'category',
  SUB_CATEGORIES = 'sub-categories',
  SUB_CATEGORY = 'sub-category',
}

export enum PrivateApi {
  BRANDS = '/api/brands',
  CATEGORIES = '/api/categories',
  SUB_CATEGORIES = '/api/sub-categories',
  DELETE_CLOUDINARY_IMAGE = '/api/cloudinary',
}

export enum PublicApi {
  BRANDS = '/api/public/brands',
  CATEGORIES = '/api/public/categories',
  SUB_CATEGORIES = '/api/public/sub-categories',
}
