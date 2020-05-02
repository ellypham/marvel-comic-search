import { elements } from './base';

const renderComic = comic => {
  const markup = `
    <li>
      <p>${comic.title}</p>
      <img src=${comic.thumbnail.path}.${comic.thumbnail.extension} />
    </li>
  `
  elements.comicResults.insertAdjacentHTML('beforeend', markup);
}

export const renderComicResults = comics => {
  comics.forEach(renderComic);
}