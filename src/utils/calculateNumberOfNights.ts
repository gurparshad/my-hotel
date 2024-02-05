export const calculateNumberOfNights = (startDate: Date | null, endDate: Date | null): number => {
  if (!startDate || !endDate) {
    return 0;
  }
  const numberOfMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();


  const oneDay = 1000 * 60 * 60 * 24;

  const numberOfNights = Math.ceil(numberOfMilliseconds / oneDay);

  return numberOfNights;
}