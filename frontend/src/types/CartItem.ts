interface CartItem {
  vendor_code: number,
  id?: string,
  size?: string,
  count: number | ''
}

export default CartItem;
