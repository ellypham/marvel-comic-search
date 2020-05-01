import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = "";

export const renderCharacterResult = character => {
  const markup = `
    <div class="character_result">
      <h2>${character.name}</h2>
      <p>${character.description}</p>
      <img src=${character.thumbnail.path} >
    </div>
  `
  elements.searchResult.insertAdjacentHTML("afterbegin", markup);
};