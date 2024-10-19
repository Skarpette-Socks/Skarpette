interface CartItem {
  vendor_code: number,
  size: string,
  name: string,
  type: string,
  image: string,
  price: number,
  price2?: number,
  count: number | ''
}

export default CartItem;
