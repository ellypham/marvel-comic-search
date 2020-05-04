import { elements } from './base';

export const clearResults = () => {
  elements.comicResults.innerHTML = "";
}

const renderComic = comic => {
  const markup = `
    <li>
      <img src=${comic.thumbnail.path}.${comic.thumbnail.extension} />
      <p>${comic.title}</p>
    </li>
  `
  elements.comicResults.insertAdjacentHTML('beforeend', markup);
}

export const renderComicResults = comics => {
  comics.forEach(renderComic);
}