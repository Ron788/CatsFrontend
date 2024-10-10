const searchForm = document.querySelector(".search__form");

//that thing for getting input from form on website
searchForm.addEventListener("submit", (event) => {
    let searchResults = document.querySelector(".search__results");
    //clear search results on submit
    searchResults.innerHTML = "";


    const cards = document.querySelectorAll(".card");
    const cardTitles = document.querySelectorAll(".card__title");
    const cardDescriptions = document.querySelectorAll(".card__descr");


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
        const descrText = lowerTexts(cardDescriptions[index]);
        const card = cards[index];

        if (!hasMatch(titleText) && !hasMatch(descrText)) {
            return;
        }

        //clone card
        let clonedCard = card.cloneNode(true);

        //remove edit and delete btns
        clonedCard.querySelector(".edit__btn").remove();
        clonedCard.querySelector(".del__btn").remove();

        searchResults.appendChild(clonedCard);
        foundMatches = true;
    });

    if (foundMatches === false) {
        searchResults.innerHTML = "No matches found";
    }
    //search Thru Cards
});