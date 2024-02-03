import { calculatePerNightPrice } from "./calculatePerNightPrice";

export const calculateTotalPrice = (numberOfNights: number, pricePerNight: number, tax: number): number => {
  const pricePerNightAfterTaxes = calculatePerNightPrice(pricePerNight, tax)
  console.log("pricePerNightAfterTaxes-->>", pricePerNightAfterTaxes);
  return numberOfNights * pricePerNightAfterTaxes;
}