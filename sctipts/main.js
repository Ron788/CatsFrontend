//array of cards with img, title and descr
let cardId = 0;
const cardsArray = [
  {
    img: "./images/catRaskolnikov.jpg",
    title: "Card title 1",
    descr: "Description of the card 1",
    id: cardId++,
  },
  {
    img: "./images/catRaskolnikov.jpg",
    title: "Card title 2",
    descr: "Description of the card 2",
    id: cardId++,
  },
  {
    img: "./images/catRaskolnikov.jpg",
    title: "Card title 3",
    descr: "Description of the card 3",
    id: cardId++,
  },
  {
    img: "./images/catRaskolnikov.jpg",
    title: "Card title 4",
    descr: "Description of the card 4",
    id: cardId++,
  },
];

//event listener on load of window(site)
window.addEventListener("load", () => {
  createCard(cardsArray);
  updateCards();
});

function createCard(cardsArray) {
  const cardsWrapper = document.querySelector(".cards-wrapper");

  cardsArray.forEach((card) => {
    const cardHTML = `
    <div class="card">
      <div class="card__image-wrapper">
        <img
          сlass="card__image"
          src="${card.img}"
          alt="Grim Reaper test"
        />
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
}

//Function is need to include cards created with createCard in search
function updateCards() {
  cards = document.querySelectorAll(".card");
  cardTitles = document.querySelectorAll(".card__title");
  cardDescrs = document.querySelectorAll(".card__descr");
}

const searchForm = document.querySelector(".search__form");
let searchResults = document.querySelector(".search__results");

//that thing for getting input from form on website
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let foundMatches = false;

  //clear search results on submit
  searchResults.innerHTML = "";
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
    searchResults.appendChild(clonedCard);
    foundMatches = true;
  });
  if (foundMatches === false) {
    searchResults.innerHTML = "No matches found";
  }
  //search Thru Cards
});

//menu on click on logo on mobile
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
    const response = await fetch(URL);
    const data = response.url;

    catImage.src = data;

    console.log(data);
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

function feedTheCat() {
  feedCatImg.src = "./images/catStalker.jpg";
}

feedCatBtn.addEventListener("click", () => {
  feedTheCat();
});
