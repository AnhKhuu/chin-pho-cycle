export enum Routes {
  HOME = '/',
  SEARCH = '/search',
  PRODUCT = '/products',
}

export enum AdminRoutes {
  BRANDS = '/admin/brands',
  CATEGORIES = '/admin/categories',
  COLLECTIONS = '/admin/collections',
}

export enum QueryKeys {
  BRANDS = 'brands',
  BRAND = 'brand',
  CATEGORIES = 'categories',
  CATEGORY = 'category',
  COLLECTIONS = 'collections',
  COLLECTION = 'collection',
  SUB_CATEGORIES = 'sub-categories',
  SUB_CATEGORY = 'sub-category',
}

export enum PrivateApi {
  BRANDS = '/api/brands',
  CATEGORIES = '/api/categories',
  COLLECTIONS = '/api/collections',
  SUB_CATEGORIES = '/api/sub-categories',
  DELETE_CLOUDINARY_IMAGE = '/api/cloudinary',
}

export enum PublicApi {
  BRANDS = '/api/public/brands',
  CATEGORIES = '/api/public/categories',
  COLLECTIONS = '/api/public/collections',
  SUB_CATEGORIES = '/api/public/sub-categories',
}
