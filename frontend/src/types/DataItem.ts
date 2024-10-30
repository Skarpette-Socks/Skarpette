interface sizeItem {
  size: string;
  is_available:boolean;
}

interface DataItem {
  _id: string;
  name: string;
  description?: string;
  vendor_code: number;
  images_urls: string[];
  composition_and_care?: string;
  type: string;
  style: string;
  price: number;
  price2?: number;
  is_new?: boolean;
  is_in_stock?: boolean;
  size: sizeItem[];
  discountPercentage?: number;
}

export default DataItem;
