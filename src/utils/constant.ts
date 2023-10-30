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

export enum I18nTermsHeader {
  BIKE = 'bike',
  BIKE_FIT = 'bike_fit',
  BRAND = 'brand',
  COLLECTIONS = 'collections',
  EVENT = 'event',
  ENGLISH = 'english',
  FEATURED = 'featured',
  MEN = 'men',
  NEW_ARRIVAL = 'new_arrival',
  PRODUCTS = 'products',
  WOMEN = 'women',
  SEARCH = 'search',
  VIETNAMESE = 'vietnamese'
}

export enum I18nTermsHome {
  EXPLORE_COLLECTION = 'banner.explore_collection',
  LATEST_PRODUCTS = 'latest_products.title',
  VIEW_MORE = 'latest_products.view_more',
  CATEGORIES = 'categories.title',
  SHOP_NOW = 'categories.shop_now'
}

export enum I18nTermsSearch {
  TYPE = 'type',
  GENDER = 'gender',
  BRAND = 'brand',
  SIZE = 'size',
  RESULTS = 'results',
  SORT_BY = 'sort_by',
  NEWEST = 'newest',
  PRICE_HIGH_TO_LOW = 'price_high_to_low',
  PRICE_LOW_TO_HIGH = 'price_low_to_high',
  PREVIOUS = 'previous',
  NEXT = 'next'
}

export enum I18nTermsProductDetails {
  READ_MORE = 'read_more',
  READ_LESS = 'read_less',
  BUY_NOW = 'buy_now',
  ADD_TO_CART = 'add_to_cart',
  DETAILS = 'details',
  FREE_SHIPPING_AND_RETURNS = 'free_shipping_and_returns',
  YOU_MAY_ALSO_LIKE = 'you_may_also_like'
}

export enum I18nTermsFooter {
  COMPANY_ADDRESS = 'company_address',
  SHIPPING = 'shipping',
  RETURNS = 'returns',
  CRASH_REPLACEMENT = 'crash_replacement',
  PARTNERS = 'partners'
}
