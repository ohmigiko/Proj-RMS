export const formatDateTime = (date) => {
  const dateTime = new Date(date);
  const formatted_date = dateTime.toLocaleDateString("TH-th");
  const formatted_time = dateTime.toLocaleTimeString("TH-th");
  return { formatted_date, formatted_time };
};