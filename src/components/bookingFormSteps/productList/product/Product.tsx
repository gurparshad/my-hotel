import classnames from "classnames";
import {calculatePerNightPrice} from "../../../../utils/calculatePerNightPrice";
import {ProductType} from "../../../../utils/types";
import styles from "./product.module.scss";

interface ProductProps {
  product: ProductType;
  isSelected: boolean;
  isFree: boolean;
  onCardClick: (product: ProductType) => void;
}

const Product: React.FC<ProductProps> = ({product, isSelected, onCardClick, isFree}) => {
  const {name, priceNet, priceTaxPercentage, chargeMethod} = product;
  const productClasses = classnames(styles.product, {
    [styles.selectedProduct]: isSelected || isFree,
  });

  return (
    <div className={productClasses} onClick={isFree ? undefined : () => onCardClick(product)}>
      <div className={styles.details}>
        <p className="name">{name}</p>
        <img src={product.image} alt="product" />
        {isFree ? (
          <p>Free</p>
        ) : (
          <div>
            <p className={styles.price}>${calculatePerNightPrice(priceNet, priceTaxPercentage)}</p>
            <p className={styles.chargeMethod}>Charge - {chargeMethod}</p>
          </div>
        )}
      </div>
      {!isFree && (
        <div className={styles.checkboxContainer}>
          <input type="checkbox" checked={isSelected} readOnly />
        </div>
      )}
    </div>
  );
};

export default Product;
