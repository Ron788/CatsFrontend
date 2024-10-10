//CAT API that shows random cat img on click of button
const catButton = document.querySelector(".rand-cat__btn");
const catImage = document.querySelector(".rand-cat__img");
const URL = "https://cataas.com/cat";

async function fetchHandler() {
    try {
        const response = await fetch(`${URL}?_=${Date.now()}`);
        catImage.src = response.url;
    } catch (error) {
        console.log(error);
    }
}

catButton.addEventListener("click", () => {
    fetchHandler();
});