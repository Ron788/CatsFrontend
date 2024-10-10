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

function getCatData(){
  const inputImg = document.querySelector(".img__input");
  const inputTitle = document.querySelector(".title__input");
  const inputDescription = document.querySelector(".descr__input");

  return [inputImg, inputTitle, inputDescription];
}

const menuInLogo = () => {
  const menu = document.querySelector(".mobile__list");
  if (window.innerWidth > 960) {
    return;
  }
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
  } else {
    menu.classList.add("show");
  }
};

function displayCard(cardsArray) {
  const cardsWrapper = document.querySelector(".cards-wrapper");

  cardsWrapper.innerHTML = "";

  cardsArray.forEach((card) => cardsWrapper.insertAdjacentHTML("beforeend", getCardHTML(card)));

  let deleteBtns = document.querySelectorAll(".del__btn");
  let editBtns = document.querySelectorAll(".edit__btn");

  editBtns.forEach((editBtn) => editBtn.addEventListener("click", editBtnClick(cardsArray)));

  deleteBtns.forEach((deleteBtn) => deleteBtn.addEventListener("click", deleteBtnClick(cardsArray)));
}

function getCardHTML(card) {
  return `<div class="card" id="${card.id}">
          <div class="card__image-wrapper">
            <img
              class="card__img"
              src="${card.src}"
              alt="Grim Reaper test"
            />
            <button class="card-change__btn edit__btn">
            <img src="./images/edit.svg" alt="Edit" />
            </button>
            <button class="card-change__btn del__btn">
            <img src="./images/delete.svg" alt="Del" />
            </button>
          </div>
          <div class="card__content">
            <h3 class="card__title">${card.title}</h3>
            <p class="card__descr">${card.descr}</p>
            <button class="card__button btn">Button</button>
          </div>
        </div>`;
}

function editBtnClick(cardsArray){
  return (event) => {
    const cardId = event.target.closest(".card").id;
    const cardIndex = cardsArray.findIndex(
        (card) => card.id === parseInt(cardId)
    );

    if (cardIndex !== -1) {

      const [inputImg, inputTitle, inputDescription] = getCatData();

      inputImg.value = cardsArray[cardIndex].src;
      inputTitle.value = cardsArray[cardIndex].title;
      inputDescription.value = cardsArray[cardIndex].descr;

      document.querySelector("#card-index").value = cardIndex;
    }

    const deleteBtns = document.querySelectorAll(".del__btn");
    deleteBtns.forEach((btn) => {
      btn.disabled = true;
    });
  };
}

function deleteBtnClick(cardsArray){
  return (event) => {
    const cardId = event.target.closest(".card").id;
    const cardIndex = cardsArray.findIndex(
        (card) => card.id === parseInt(cardId)
    );

    if (cardIndex !== -1) {
      cardsArray.splice(cardIndex, 1);
    }

    event.target.closest(".card").remove();
  };
}

const cardForm = document.querySelector(".card__form");

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const [inputImg, inputTitle, inputDescription] = getCatData();
  const cardIndex = document.querySelector("#card-index").value;

  if (cardIndex !== "-1") {
    cardsArray[cardIndex].src = inputImg.value;
    cardsArray[cardIndex].title = inputTitle.value;
    cardsArray[cardIndex].descr = inputDescription.value;
  } else {
    const newCard = {
      id: Date.now(),
      src: inputImg,
      title: inputTitle,
      descr: inputDescription,
    };
    cardsArray.push(newCard);
  }

  displayCard(cardsArray); // Update the card display with the new data

  document.querySelector("#card-index").value = "-1";
  document.querySelector(".img__input").value = "";
  document.querySelector(".title__input").value = "";
  document.querySelector(".descr__input").value = "";
});

addEventListener("DOMContentLoaded", () => {
  displayCard(cardsArray);
});
