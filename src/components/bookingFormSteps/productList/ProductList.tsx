import React from "react";
import {ProductType} from "../../../types";
import Button from "../../button/Button";
import Product from "./product/Product";
import data from "../../../data/data.json";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {addProduct, removeProduct} from "../../../features/form/formSlice";
import {calculateNumberOfNights} from "../../../utils/calculateNumberOfNights";
import {calculateTotalPrice} from "../../../utils/calculateTotalPrice";
import {calculatePerNightPrice} from "../../../utils/calculatePerNightPrice";
import styles from "./productList.module.scss";

interface ProductListProps {
  onNext: () => void;
  onBack: () => void;
}

const ProductList: React.FC<ProductListProps> = ({onNext, onBack}) => {
  const products = data.products.data;
  const dispatch = useAppDispatch();

  const startDate = useAppSelector((state: RootState) => state.form.form.formData.startDate);
  const endDate = useAppSelector((state: RootState) => state.form.form.formData.endDate);
  const numberOfNights = calculateNumberOfNights(startDate, endDate);

  const selectedProductIds = useAppSelector((state: RootState) =>
    state.form.form.formData.products.map((product: ProductType) => product.id)
  );

  const handleTotalPrice = (productId: number, netPrice: number, tax: number) => {
    if (productId === 3) {
      return calculatePerNightPrice(netPrice, tax);
    } else {
      return calculateTotalPrice(numberOfNights, netPrice, tax);
    }
  };

  const handleCardClick = (product: ProductType) => {
    const productData = {
      id: product.id,
      name: product.name,
      priceNet: product.priceNet,
      priceTaxPercentage: product.priceTaxPercentage,
      chargeMethod: product.chargeMethod,
      image: product.image,
      totalPrice: handleTotalPrice(product.id, product.priceNet, product.priceTaxPercentage),
      numberOfNights: numberOfNights,
    };
    if (selectedProductIds.includes(product.id)) {
      dispatch(removeProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }
  };

  return (
    <div className={styles.productList}>
      <div className={styles.products}>
        {products.map((product: ProductType) => (
          <Product
            key={product.id}
            product={product}
            isSelected={selectedProductIds.includes(product.id)}
            onCardClick={handleCardClick}
            isFree={numberOfNights >= 28 && product.id === 1}
          />
        ))}
      </div>
      <div>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default ProductList;
