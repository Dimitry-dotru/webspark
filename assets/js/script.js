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

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  const { scrollY } = window;

  if (scrollY >= 50) header.style.backgroundColor = "var(--white)";
  else header.style.backgroundColor = "var(--white-opacity)";

});

const getRandomDate = () => {
  const year = Math.floor(Math.random() * (2024 - 2016 + 1)) + 2016;
  const month = Math.floor(Math.random() * 12);
  const tempDate = new Date(year, month + 1, 0);
  const day = Math.floor(Math.random() * tempDate.getDate()) + 1;

  return `${day}-${month + 1}-${year}`;
};

const fillFakeData = (elAmnt) => {
  for (let i = 0; i < elAmnt; i++) {
    const randomNum = Math.floor(Math.random() * 8) + 1;
    const tempObj = {
      imgLink: `assets/img/picture-${randomNum}.png`,
      "like-1": Math.floor(Math.random() * 1000) + 1,
      "like-2": Math.floor(Math.random() * 1000) + 1,
      "comment-1": Math.floor(Math.random() * 1000) + 1,
      "comment-2": Math.floor(Math.random() * 1000) + 1,
      "date-1": getRandomDate(),
      "date-2": getRandomDate(),
    };
    fakeData.push(tempObj);
  }
};

const fakeData = [];
fillFakeData(10);

const postsContainer = document.querySelector(".posts-container");

if (postsContainer)
  fakeData.forEach((el) => {
    const element = `
<div class="post-element">
  <img src="${el.imgLink}" alt="Post picture">
  <div class="post-element-info">
      <div class="social-actions social-actions-1">
        <h4>Today</h4>
        <div class="social-actions-btns">
          <div>
            <img src="assets/img/like-icon.svg" alt="Like">
            <span class="text-sm">${el["like-1"]}</span>
          </div>
          <div>
            <img src="assets/img/comment-icon.svg" alt="Comment">
            <span>${el["comment-1"]}</span>
          </div>
        </div>
      </div>
      <div class="social-actions social-actions-2">
        <h4>${el["date-1"]}</h4>
        <div class="social-actions-btns">
          <div>
            <img src="assets/img/like-icon.svg" alt="Like">
            <span>${el["like-2"]}</span>
          </div>
          <div>
            <img src="assets/img/comment-icon.svg" alt="Comment">
            <span>${el["comment-2"]}</span>
          </div>
        </div>
      </div>
      <div class="upload-time">
        <h4>Image upload</h4>
        <span>${el["date-2"]}</span>
      </div>
  </div>
  `;

    postsContainer.innerHTML += element;
  });
