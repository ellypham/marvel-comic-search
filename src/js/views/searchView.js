import { elements } from "./base";

const autocompleteList = document.getElementById("autocomplete__list");

const searchCharacter = async (searchText) => {
  const characters = await fetch("./data/characters.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });

  // Get matches to current text input
  let matches = characters.filter((char) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return char.match(regex);
  });

  if (searchText.length === 0) {
    matches = 0;
    autocompleteList.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="autocomplete__card">
        <h4>${match}</h4>
      </div>
    `
      )
      .join("");
    autocompleteList.innerHTML = html;
  }
};

// Autocomplete
elements.searchInput.addEventListener("input", () =>
  searchCharacter(elements.searchInput.value)
);

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
  autocompleteList.innerHTML = "";
};

export const clearResults = () => {
  elements.searchResult.innerHTML = "";
};

// update to display none instead
// when modal is closed display block
export const hideFeature = () => {
  elements.feature.style.display = "none";
};
// back to search function will display featured characters again
export const showFeature = () => {
  elements.feature.style.display = "block";
};

export const renderCharacterResult = (character) => {
  const markup = `
    <div class="container">
      <div class="character__info">
      <figure>
        <img src=${character.thumbnail.path}.${character.thumbnail.extension} >
      </figure>
      <div class="character__copy">
        <a href="#feature" class="back">Back to Search</a>
        <h2>${character.name}</h2>
        <p>${character.description}</p>
      </div>
      </div>
    </div>
  `;
  elements.searchResult.insertAdjacentHTML("afterbegin", markup);
};
