interface FavoriteItem {
  vendor_code: number;
  image: string;
  category: string;
  name: string;
  price: number;
  discount_price?: number;
}

export default FavoriteItem;