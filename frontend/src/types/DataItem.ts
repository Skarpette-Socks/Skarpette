interface Compozition_and_care {
  compozition: string;
  care: string;
}

interface DataItem {
  _id: string;
  name: string;
  description?: string;
  vendor_code: string;
  images_urls: string[] | undefined;
  compozition_and_care?: Compozition_and_care;
  type: string;
  style: string;
  price: number;
  price2?: number;
  is_new?: boolean;
  size: string[];
}

export default DataItem;
