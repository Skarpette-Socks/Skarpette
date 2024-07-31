interface DataItem {
  _id: string;
  name: string;
  vendor_code: string;
  images_urls: string[] | undefined;
  type: string;
  price: number;
  price2?: number;
}

export default DataItem