export function getTimeFormatFromDateString(dateString: string) {
  if (dateString == "") {
    return "";
  }
  if(dateString.length == 5) {
    dateString = `2020-01-01T${dateString}:00.000Z`;
  }
  return (
    ("0" + new Date(dateString).getHours()).slice(-2) +
    ":" +
    ("0" + new Date(dateString).getMinutes()).slice(-2)
  );
}
