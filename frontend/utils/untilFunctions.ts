

export function getTimeFormatFromDateString(dateString: string) {
    return (
      ("0" + new Date(dateString).getHours()).slice(-2) +
      ":" +
      ("0" + new Date(dateString).getMinutes()).slice(-2)
    );
  }
