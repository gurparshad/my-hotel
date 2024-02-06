import { calculatePerNightPrice } from './calculatePerNightPrice';

export const calculateTotalPrice = (
  numberOfNights: number,
  pricePerNight: number,
  tax: number,
): number => {
  const pricePerNightAfterTaxes = calculatePerNightPrice(pricePerNight, tax);
  return Number((numberOfNights * pricePerNightAfterTaxes).toFixed(2));
};
