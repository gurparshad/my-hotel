export const formatDate = (date: string): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('default', { month: 'short' });
  const day = newDate.getDate();

  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');

  const formattedStartDate = `${day} ${month} ${year} ${hours}:${minutes}`;

  return formattedStartDate;
}
