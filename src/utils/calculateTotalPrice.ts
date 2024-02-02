export const calculateTotalPrice = (numberOfNights: number, pricePerNight: number): number => {
  return numberOfNights * pricePerNight;
}