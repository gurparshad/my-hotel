import React from "react";
import {ProductType} from "../../utils/types";
import Button from "../button/Button";
import Product from "../product/Product";

interface ProductListProps {
  onNext: () => void;
  onBack: () => void;
}

const ProductList: React.FC<ProductListProps> = ({onNext, onBack}) => {
  const products = [
    {
      id: 1,
      name: "Breakfast",
      priceNet: 6,
      priceTaxPercentage: 0.09,
      chargeMethod: "nightly",
      image: "https://via.placeholder.com/400x200.png?text=Breakfast",
    },
    {
      id: 1,
      name: "Breakfast",
      priceNet: 6,
      priceTaxPercentage: 0.09,
      chargeMethod: "nightly",
      image: "https://via.placeholder.com/400x200.png?text=Breakfast",
    },
    {
      id: 1,
      name: "Breakfast",
      priceNet: 6,
      priceTaxPercentage: 0.09,
      chargeMethod: "nightly",
      image: "https://via.placeholder.com/400x200.png?text=Breakfast",
    },
  ];
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
