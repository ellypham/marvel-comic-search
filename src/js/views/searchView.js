import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = "";

export const renderCharacterResult = character => {
  const markup = `
    <div class="character__info">
      <img src=${character.thumbnail.path}.${character.thumbnail.extension} >
      <div class="character__copy">
        <h2>${character.name}</h2>
        <p>${character.description}</p>
      </div>
    </div>
  `
  elements.searchResult.insertAdjacentHTML("afterbegin", markup);
};