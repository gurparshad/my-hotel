export const calculateNumberOfNights = (startDate: Date, endDate: Date): number => {
  console.log("endDate-->>", endDate);
  const numberOfMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();


  const oneDay = 1000 * 60 * 60 * 24;

  const numberOfNights = Math.ceil(numberOfMilliseconds / oneDay);

  return numberOfNights;
}