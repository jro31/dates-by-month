const datesByMonth = (startDate = new Date(), numberOfPastMonths = 0, numberOfFutureMonths = 0) => {
  const datesInMonth = date => {
    let dateInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let dates = [];

    while (dateInMonth.getMonth() === date.getMonth()) {
      dates.push(new Date(dateInMonth.getTime() - dateInMonth.getTimezoneOffset() * 60000));
      dateInMonth.setDate(dateInMonth.getDate() + 1);
    }

    return dates;
  };

  const startMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() - numberOfPastMonths,
    1
  );
  const endMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + numberOfFutureMonths,
    1
  );

  let monthsArray = [];

  for (let dt = new Date(startMonth); dt <= endMonth; dt.setMonth(dt.getMonth() + 1)) {
    monthsArray.push(datesInMonth(new Date(dt)));
  }

  return monthsArray;
};

module.exports = datesByMonth;
