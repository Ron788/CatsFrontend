//feed the cat

const feedCatBtn = document.querySelector(".feed-cat__btn");

feedCatBtn.addEventListener("click", () => {
    const feedCatImg = document.querySelector(".feed-cat__img");

    feedCatImg.src = "./images/catStalker.jpg";
});