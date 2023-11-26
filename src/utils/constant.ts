import { Big_Shoulders_Display } from 'next/font/google';

export const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ['latin'],
});

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
  SUB_CATEGORY = 'sub-category',
  TYPES = 'types',
  PRODUCTS = 'products',
  PRODUCT = 'product',
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
  COMMUNITY = 'community',
  ENGLISH = 'english',
  FEATURED = 'featured',
  MEN = 'men',
  NEW_ARRIVAL = 'new_arrival',
  PRODUCTS = 'products',
  WOMEN = 'women',
  SEARCH = 'search',
  VIETNAMESE = 'vietnamese',
}

export enum I18nTermsHome {
  EXPLORE_COLLECTION = 'banner.explore_collection',
  LATEST_PRODUCTS = 'latest_products.title',
  VIEW_MORE = 'latest_products.view_more',
  CATEGORIES = 'categories.title',
  SIGN_UP_FOR_BIKE_FIT = 'video.sign_up',
  MEN = 'static_categories.men',
  WOMEN = 'static_categories.women',
  FIND_OUT_MORE = 'video.find_out_more',
  EVENT = 'side_pages.event',
  COMMUNITY = 'side_pages.community',
  STORE = 'side_pages.store',
  FREE_SHIPPING = 'commitment.free_shipping',
  FREE_SHIPPING_DESC = 'commitment.free_shipping_desc',
  FREE_RETURN = 'commitment.free_return',
  FREE_RETURN_DESC = 'commitment.free_return_desc',
  CRASH_REPLACEMENT = 'commitment.crash_replacement',
  CRASH_REPLACEMENT_DESC = 'commitment.crash_replace_desc',
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
  NEXT = 'next',
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex',
}

export enum I18nTermsProductDetails {
  READ_MORE = 'read_more',
  READ_LESS = 'read_less',
  BUY_NOW = 'buy_now',
  ADD_TO_CART = 'add_to_cart',
  DETAILS = 'details',
  FREE_SHIPPING_AND_RETURNS = 'free_shipping_and_returns',
  YOU_MAY_ALSO_LIKE = 'you_may_also_like',
  VIEW_MORE = 'view_more',
}

export enum I18nTermsFooter {
  COMPANY_ADDRESS = 'company_address',
  SHIPPING = 'shipping',
  RETURNS = 'returns',
  CRASH_REPLACEMENT = 'crash_replacement',
  PARTNERS = 'partners',
  KEEP_UP = 'keep_up',
  ENTER_EMAIL = 'enter_email',
  CARE_GUIDE = 'care_guide',
  CUSTOMER_SERVICE = 'customer_service',
  FAQ = 'faq',
  ABOUT_US = 'about_us',
  ABOUT = 'about',
  STORE = 'store',
  OUR_COMMUNITY = 'our_community',
  POLICY = 'policy',
  TERM_AND_CONDITION = 'term_and_condition',
}

export enum I18nTermsProductCard {
  COLORS = 'colors',
  COLOR = 'color',
}

export const PAGE_SIZE = 4;

export enum QueryParam {
  TYPES = 'types',
  BRANDS = 'brands',
  GENDERS = 'genders',
  CATEGORY = 'category',
  NAME = 'name',
}
