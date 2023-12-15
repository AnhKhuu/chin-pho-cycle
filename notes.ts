// HOMEPAGE APIs
// get-highlights
type THighlight = {
  imageUrl?: string;
  videoUrl?: string;
  logoUrl?: string;
  title?: string;
  description?: string;
  id: string;
}[];

// get-categories
// - Include types, collections, brands
// - Include 2 featured products with each category

// get-types
// - Include imageUrl in each type

// get-brands
type TBrand = {
  imageUrl: string;
  logoUrl: string;
  title: string;
  description: string;
  id: string
};

// get-video
type TVideo = {
  videoUrl: string;
  title: string;
  description: string;
};

//SEARCH PAGE APIs
// get-category
// - Include types, collections, brands
// - Inside type, collection include imageUrl

// get-variants
// - Filter by typeId, brandId, gender, categoryId, size, collectionId
// - Sort by latest, name, price
