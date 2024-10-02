const cardsArray = [
  {
    id: 0,
    src: "./images/catBoss.jpg",
    title: `Бро босс`,
    descr: `Этот бро разлегся как чертов босс, хозяин территории`,
  },
  {
    id: 1,
    src: "./images/catStratch.jpg",
    title: `Бро тянется`,
    descr: `Этот бро разминается после сна`,
  },
  {
    id: 2,
    src: "./images/catSniper.jpg",
    title: `Бро снайпер`,
    descr: `Этот бро попадает в яблочко 10 из 10 раз`,
  },
  {
    id: 3,
    src: "./images/catLooks.jpg",
    title: `Бро смотрит`,
    descr: `Этот бро очень любопытно смотрит в камеру, интересно`,
  },
  {
    id: 4,
    src: "./images/catTouchesLegs.jpg",
    title: `Бро креветка`,
    descr: `Этот бро скрутился как креветка, выпрями спину!`,
  },
  {
    id: 5,
    src: "./images/officeCat.jpg",
    title: `Бро работник`,
    descr: `Этот бро самый производительный работник в офисе. Премия в виде рыбов обеспеченна`,
  },
  {
    id: 6,
    src: "./images/catGotCubeHead.jpg",
    title: `Бро Стив`,
    descr: `Этот бро играл в майнкрафт слишком много,теперь у него куб вместо головы`,
  },
];

function updateCardsData() {
  cards = document.querySelectorAll(".card");
  cardTitles = document.querySelectorAll(".card__title");
  cardDescrs = document.querySelectorAll(".card__descr");
}

const menuOnLogo = () => {
  const menu = document.querySelector(".mobile__list");
  if (window.innerWidth <= 960) {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
    } else {
      menu.classList.add("show");
    }
  }
};

//CAT API that shows random cat img on click of button
const catButton = document.querySelector(".rand-cat__btn");
const catImage = document.querySelector(".rand-cat__img");
const URL = "https://cataas.com/cat";

async function fetchHandler() {
  try {
    const response = await fetch(`${URL}?_=${Date.now()}`);
    const data = response.url;
    catImage.src = data;
  } catch (error) {
    console.log(error);
  }
}

catButton.addEventListener("click", () => {
  fetchHandler();
});

//feed the cat

const feedCatImg = document.querySelector(".feed-cat__img");
const feedCatBtn = document.querySelector(".feed-cat__btn");

feedCatBtn.addEventListener("click", () => {
  feedCatImg.src = "./images/catStalker.jpg";
});

function displayCard(cardsArray) {
  const cardsWrapper = document.querySelector(".cards-wrapper");

  cardsWrapper.innerHTML = "";

  cardsArray.forEach((card) => {
    const cardHTML = `
        <div class="card" id="${card.id}">
          <div class="card__image-wrapper">
            <img
              class="card__img"
              src="${card.src}"
              alt="Grim Reaper test"
            />
            <button class="card-delete__btn">X</button>
            <button class="card-edit__btn">
              Edit
            </button>
          </div>
          <div class="card__content">
            <h3 class="card__title">${card.title}</h3>
            <p class="card__descr">${card.descr}</p>
            <button class="card__button">Button</button>
          </div>
        </div>
      `;

    cardsWrapper.insertAdjacentHTML("beforeend", cardHTML);
  });

  let deleteBtn = document.querySelectorAll(".card-delete__btn");
  let editBtn = document.querySelectorAll(".card-edit__btn");

  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", (event) => {
      const cardId = event.target.closest(".card").id;
      const cardIndex = cardsArray.findIndex(
        (card) => card.id === parseInt(cardId)
      );

      if (cardIndex !== -1) {
        const inputImg = document.querySelector(".img__input");
        const inputTitle = document.querySelector(".title__input");
        const inputDescr = document.querySelector(".descr__input");

        inputImg.value = cardsArray[cardIndex].src;
        inputTitle.value = cardsArray[cardIndex].title;
        inputDescr.value = cardsArray[cardIndex].descr;

        document.querySelector("#card-index").value = cardIndex;
      }

      const deleteBtns = document.querySelectorAll(".card-delete__btn");
      deleteBtns.forEach((btn) => {
        btn.disabled = true;
      });
    });
  }

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", (event) => {
      const cardId = event.target.closest(".card").id;
      const cardIndex = cardsArray.findIndex(
        (card) => card.id === parseInt(cardId)
      );

      if (cardIndex !== -1) {
        cardsArray.splice(cardIndex, 1);
      }

      event.target.closest(".card").remove();
      updateCardsData();
    });
  }

  updateCardsData();
}

const cardForm = document.querySelector(".card__form");

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputImg = document.querySelector(".img__input").value;
  const inputTitle = document.querySelector(".title__input").value;
  const inputDescr = document.querySelector(".descr__input").value;
  const cardIndex = document.querySelector("#card-index").value;

  if (cardIndex !== "-1") {
    cardsArray[cardIndex].src = inputImg;
    cardsArray[cardIndex].title = inputTitle;
    cardsArray[cardIndex].descr = inputDescr;
  } else {
    const newCard = {
      id: Date.now(),
      src: inputImg,
      title: inputTitle,
      descr: inputDescr,
    };
    cardsArray.push(newCard);
  }

  displayCard(cardsArray); // Update the card display with the new data
  updateCardsData();

  document.querySelector("#card-index").value = "-1";
  document.querySelector(".img__input").value = "";
  document.querySelector(".title__input").value = "";
  document.querySelector(".descr__input").value = "";
});

const searchForm = document.querySelector(".search__form");
let searchResults = document.querySelector(".search__results");

//that thing for getting input from form on website
searchForm.addEventListener("submit", (event) => {
  //clear search results on submit
  searchResults.innerHTML = "";
  updateCardsData();
  event.preventDefault();
  let foundMatches = false;

  //change class of search results to get it shown
  searchResults.classList.add("show");

  //getting user input from form
  const userInput = document
    .querySelector(".search__input")
    .value.trim()
    .toLowerCase();
  const lowerTexts = (element) =>
    element.textContent.trim().toLowerCase().toString();
  const hasMatch = (text) => text.includes(userInput);

  if (userInput === "") {
    searchResults.innerHTML = "Empty string was entered";
    return;
  }

  cardTitles.forEach((cardTitle, index) => {
    const titleText = lowerTexts(cardTitle);
    const descrText = lowerTexts(cardDescrs[index]);
    const card = cards[index];

    if (!hasMatch(titleText) && !hasMatch(descrText)) {
      return;
    }

    //clone card
    let clonedCard = card.cloneNode(true);

    //remove edit and delete btns
    clonedCard.querySelector(".card-edit__btn").remove();
    clonedCard.querySelector(".card-delete__btn").remove();

    searchResults.appendChild(clonedCard);
    foundMatches = true;
  });
  if (foundMatches === false) {
    searchResults.innerHTML = "No matches found";
  }
  //search Thru Cards
});

addEventListener("DOMContentLoaded", () => {
  displayCard(cardsArray);
  updateCardsData();
});
