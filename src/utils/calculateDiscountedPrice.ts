import { calculatePerNightPrice } from "./calculatePerNightPrice";

export const calculateDiscountedPrice = (numberOfNights: number, pricePerNight: number, tax: number): number => {
  const pricePerNightAfterTaxes = calculatePerNightPrice(pricePerNight, tax)
  const totalPrice = numberOfNights * pricePerNightAfterTaxes;

  const discountedPrice = totalPrice - (totalPrice * 0.05);

  return Number(discountedPrice.toFixed(2));
}