import {lazy, Suspense} from "react";
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {ProductType} from "../../utils/types";
import "./product.scss";

interface ProductProps {
  product: ProductType;
  isSelected: boolean;
  onCardClick: any;
}

const Product: React.FC<ProductProps> = ({product, isSelected, onCardClick}) => {
  const {name, image, priceNet, priceTaxPercentage, chargeMethod} = product;
  const LazyImage = lazy(() => import("../lazyImage/LazyImage"));

  return (
    <div className="product" onClick={() => onCardClick(product)}>
      <div className="details">
        <p className="name">{name}</p>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={product.image} alt="product-image" />
        </Suspense>
        <p className="price">${calculatePerNightPrice(priceNet, priceTaxPercentage)}</p>
        <p className="chargeMethod">Charge - {chargeMethod}</p>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" checked={isSelected} readOnly />
      </div>
    </div>
  );
};

export default Product;
