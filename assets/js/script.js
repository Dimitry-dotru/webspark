const allDateInputs = document.querySelectorAll("input[data-date]");

if (allDateInputs.length)
  allDateInputs.forEach((el) => {
    const picker = new Pikaday({
      field: el,
      showDaysInNextAndPreviousMonths: true,
      format: "D/M/YYYY",
      toString(date, format) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}_${month}_${year}`;
      },
      parse(dateString, format) {
        const parts = dateString.split("_");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      },
      onSelect: function (date) {
        const parentEl = el.parentElement;
        const textContainer = parentEl.querySelector("span");
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        textContainer.textContent = `${day}_${month}_${year}`;
      },
    });
  });
