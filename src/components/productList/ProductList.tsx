import React from "react";
import {ProductType} from "../../utils/types";
import Button from "../button/Button";
import Product from "../product/Product";
import data from "../../data/data.json";

interface ProductListProps {
  onNext: () => void;
  onBack: () => void;
}

const ProductList: React.FC<ProductListProps> = ({onNext, onBack}) => {
  const products = data.products.data;
  return (
    <div>
      {products.map((product: ProductType) => (
        <Product product={product} />
      ))}
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};

export default ProductList;
