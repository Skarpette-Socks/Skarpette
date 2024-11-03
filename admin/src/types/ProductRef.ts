import Category from "./Category";
import SizeItem from "./SizeItem";

interface ProductRef {
  isValid: () => boolean;
  getName: () => string;
  getDescription: () => string;
  getImages: () => File[];
  getCompAndCare: () => string;
  getCategory: () => Category;
  getStyles: () => string[];
  getPrice: () => number;
  getPrice2: () => number;
  getIsNew: () => boolean;
  getIsHit: () => boolean;
  getSizes: () => SizeItem[];
  getPageType: () => 'add' | 'edit';
}


export default ProductRef;