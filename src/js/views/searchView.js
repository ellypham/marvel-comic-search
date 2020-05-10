import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = "");

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
