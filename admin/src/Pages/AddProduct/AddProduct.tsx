import Product from "../../Components/Product/Product";
import ProductPageType from "../../types/ProductPageType";

const AddProduct = () => {
  const defaultProps = {
    _id: '',
    name: '',
    description: '',
    vendor_code: 0,
    images_urls: [],
    composition_and_care: '',
    type: '',
    style: [],
    price: 0,
    price2: 0,
    is_new: false,
    is_hit: false,
    isTop: false,
    size: [],
  };

  const resetData = () => {
    return;
  }

  return (
    <Product 
      pageType={ProductPageType.ADD} 
      item={defaultProps}
      resetData={() => resetData()}
    />
  );
};

export default AddProduct;