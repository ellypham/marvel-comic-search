import { elements } from './base';

export const clearResults = () => {
  elements.comicResults.innerHTML = "";
  elements.comicPages.innerHTML = "";
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

const createPageButtons = (page, type) => `
  <button btn data-goto=${type === 'prev' ? page - 1 : page + 1}>Page ${type === 'prev' ? page - 1 : page + 1}</button>
`;

const renderPageButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if(page === 1 && pages > 1) {
    button = createPageButtons(page, 'next');
  } else if(page < pages) {
    button = `
      ${createPageButtons(page, 'prev')}
      ${createPageButtons(page, 'next')}
    `
  } else if(page === pages && pages > 1) {
    button = createPageButtons(page, 'prev');
  }

  elements.comicPages.insertAdjacentHTML('afterbegin', button);

}

export const renderComicResults = (comics, page = 1, resPerPage = 4) => {
  //render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  comics.slice(start, end).forEach(renderComic);

  //render pagination buttons
  renderPageButtons(page, comics.length, resPerPage);
}

