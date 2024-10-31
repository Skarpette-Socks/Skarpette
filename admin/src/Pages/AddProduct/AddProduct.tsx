import Product from "../../Components/Product/Product";


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
    isNew: false,
    isTop: false,
    size: [],
  }

 return (
    <Product pageType='add' item={defaultProps}/>
 );
};

export default AddProduct;
