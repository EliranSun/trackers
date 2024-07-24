export const getCreatedTime = (date) => {
  if (!date) {
    return "No logs yet";
  }
  
  const createdDate = new Date(date);
  // 24-hour time format
  const createdTime = createdDate.toLocaleTimeString("en-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  return `${createdTime}`;
}