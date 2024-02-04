import classnames from "classnames";
import {lazy, Suspense} from "react";
import {calculatePerNightPrice} from "../../utils/calculatePerNightPrice";
import {ProductType} from "../../utils/types";
import "./product.scss";

interface ProductProps {
  product: ProductType;
  isSelected: boolean;
  onCardClick: any;
  isFree: boolean;
}

const Product: React.FC<ProductProps> = ({product, isSelected, onCardClick, isFree}) => {
  const {name, image, priceNet, priceTaxPercentage, chargeMethod} = product;
  const LazyImage = lazy(() => import("../lazyImage/LazyImage"));
  const productClasses = classnames("product", {
    "selected-product": isSelected || isFree,
  });

  return (
    <div className={productClasses} onClick={isFree ? undefined : () => onCardClick(product)}>
      <div className="details">
        <p className="name">{name}</p>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={product.image} alt="product-image" />
        </Suspense>
        {isFree ? (
          <p>Free</p>
        ) : (
          <div>
            <p className="price">${calculatePerNightPrice(priceNet, priceTaxPercentage)}</p>
            <p className="chargeMethod">Charge - {chargeMethod}</p>
          </div>
        )}
      </div>
      {!isFree && (
        <div className="checkbox-container">
          <input type="checkbox" checked={isSelected} readOnly />
        </div>
      )}
    </div>
  );
};

export default Product;
