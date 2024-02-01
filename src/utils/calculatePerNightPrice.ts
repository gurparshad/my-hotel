export const calculatePerNightPrice = (perNightNetPrice: number, tax: number) => {
  const totalPricePerNight = perNightNetPrice * (1 + tax);
  return Number(totalPricePerNight.toFixed(2));
};