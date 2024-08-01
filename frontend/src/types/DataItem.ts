interface DataItem {
  _id: string;
  name: string;
  vendor_code: string;
  images_urls: string[] | undefined;
  type: string;
  price: number;
  price2?: number;
  is_new?: boolean;
}

export default DataItem;
