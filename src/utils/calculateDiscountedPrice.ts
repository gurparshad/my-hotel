export const calculateDiscountedPrice = (numberOfNights: number, pricePerNight: number): number => {
  const totalPrice = numberOfNights * pricePerNight;

  const discountedPrice = totalPrice - (totalPrice * 0.05);

  return discountedPrice;
}