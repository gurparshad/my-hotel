export const toUtcFormat = (date: string, time: string) => {
  const localDate = new Date(date);

  const [hour, minute] = time.split(":").map(part => parseInt(part));

  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  localDate.setHours(hour);
  localDate.setMinutes(minute);
  const utcDateString = localDate.toISOString();

  return utcDateString;
};
