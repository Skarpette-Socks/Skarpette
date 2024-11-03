import SizeItem from "./SizeItem";

interface DataItem {
  _id: string;
  name: string;
  description: string;
  vendor_code: number;
  images_urls: File[];
  composition_and_care: string;
  type: string;
  style: string[];
  price: number;
  price2: number;
  is_new: boolean;
  is_hit: boolean;
  is_in_stock?: boolean;
  size: SizeItem[];
  discountPercentage?: number;
}

export default DataItem;
