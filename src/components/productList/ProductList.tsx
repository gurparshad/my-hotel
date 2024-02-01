import React from "react";
import {ProductType} from "../../utils/types";
import Button from "../button/Button";
import Product from "../product/Product";
import data from "../../data/data.json";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {addProduct, removeProduct} from "../../features/form/formSlice";

interface ProductListProps {
  onNext: () => void;
  onBack: () => void;
}

const ProductList: React.FC<ProductListProps> = ({onNext, onBack}) => {
  const products = data.products.data;
  const dispatch = useAppDispatch();

  const selectedProductIds = useAppSelector((state: RootState) =>
    state.form.formData.products.map((product: ProductType) => product.id)
  );

  const handleCardClick = (product: ProductType) => {
    if (selectedProductIds.includes(product.id)) {
      dispatch(removeProduct(product));
    } else {
      dispatch(addProduct(product));
    }
  };

  return (
    <div>
      {products.map((product: ProductType) => (
        <Product product={product} isSelected={selectedProductIds.includes(product.id)} onCardClick={handleCardClick} />
      ))}
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};

export default ProductList;
