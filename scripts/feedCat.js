//feed the cat

const feedCatImg = document.querySelector(".feed-cat__img");
const feedCatBtn = document.querySelector(".feed-cat__btn");

feedCatBtn.addEventListener("click", () => {



    feedCatImg.src = "./images/catStalker.jpg";
});