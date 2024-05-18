// prettier-ignore
const datesByMonth = (startDate = new Date(), numberOfPastMonths = 0, numberOfFutureMonths = 0, utc = true) => {
  const datesInMonth = date => {
    let dateInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let dates = [];

    while (dateInMonth.getMonth() === date.getMonth()) {
      dates.push(new Date(utc ? dateInMonth.getTime() - dateInMonth.getTimezoneOffset() * 60000 : dateInMonth))
      dateInMonth.setDate(dateInMonth.getDate() + 1);
    }

    return dates;
  };

  if (!(startDate instanceof Date)) throw new Error("The first argument must be a date object (for example, new Date('2024-01-01'))");

  const parsedNumberOfPastMonths = Number(numberOfPastMonths)
  if (!Number.isInteger(parsedNumberOfPastMonths) || parsedNumberOfPastMonths < 0) throw new Error("The second argument must be a whole number equal to or greater than zero (for example 3)")

  const parsedNumberOfFutureMonths = Number(numberOfFutureMonths)
  if (!Number.isInteger(parsedNumberOfFutureMonths) || parsedNumberOfFutureMonths < 0) throw new Error("The third argument must be a whole number equal to or greater than zero (for example 3)")

  const startMonth = new Date(startDate.getFullYear(), startDate.getMonth() - parsedNumberOfPastMonths, 1);
  const endMonth = new Date(startDate.getFullYear(), startDate.getMonth() + parsedNumberOfFutureMonths, 1);

  let monthsArray = [];

  for (let dt = new Date(startMonth); dt <= endMonth; dt.setMonth(dt.getMonth() + 1)) {
    monthsArray.push(datesInMonth(new Date(dt)));
  }

  return monthsArray;
};

module.exports = datesByMonth;
