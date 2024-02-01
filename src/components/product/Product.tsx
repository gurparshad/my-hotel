import {useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {addProduct, removeProduct} from "../../features/form/formSlice";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {ProductType} from "../../utils/types";
import "./product.scss";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({product}) => {
  const {name, image, priceNet, priceTaxPercentage, chargeMethod} = product;
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();

  const handleCardClick = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      dispatch(addProduct(product));
    } else {
      dispatch(removeProduct(product));
    }
  };

  return (
    <div className="product" onClick={handleCardClick}>
      <div className="details">
        <p className="name">{name}</p>
        <img className="productImage" src={image} alt="product-image" />
        <p className="price">${calculatePerNightPrice(priceNet, priceTaxPercentage)}</p>
        <p className="chargeMethod">Charge - {chargeMethod}</p>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" checked={isChecked} readOnly />
      </div>
    </div>
  );
};

export default Product;
