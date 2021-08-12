module.exports = {
  formattedDate: (date) => {
    const dateNow = new Date(date);
    const year = dateNow.getFullYear();
    const month =
      String(dateNow.getMonth() + 1).length === 1
        ? `0${dateNow.getMonth() + 1}`
        : dateNow.getMonth() + 1;
    const day =
      String(dateNow.getDay()).length === 1
        ? `0${dateNow.getDay()}`
        : dateNow.getDay();
    return `${year}. ${month}. ${day}`;
  }
}