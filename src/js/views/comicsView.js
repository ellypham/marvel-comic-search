import { elements } from "./base";

export const clearResults = () => {
  elements.comicResults.innerHTML = "";
  elements.comicPages.innerHTML = "";
};

const renderComic = (comic) => {
  const markup = `
    <li>
      <img src=${comic.thumbnail.path}.${comic.thumbnail.extension} alt=""/>
      <p>${comic.title}</p>
      <button class="btn__list" aria-label="Add Comic to read list">Add to list</button>
    </li>
  `;
  elements.comicResults.insertAdjacentHTML("beforeend", markup);
};

const createPageButtons = (page, type) => `
  <button class="btn__pagination btn-chevron-${
    type === "left" ? "left" : "right"
  } " aria-label="Current page ${page}, Go to page ${
  type === "left" ? page - 1 : page + 1
}" data-goto=${type === "left" ? page - 1 : page + 1}>
    <span class="chevron__icon">
      <i class="fas fa-chevron-${type === "left" ? "left" : "right"} fa-7x"></i>
    </span>
  </button>
`;

const renderPageButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createPageButtons(page, "right");
  } else if (page < pages) {
    button = `
      ${createPageButtons(page, "left")}
      ${createPageButtons(page, "right")}
    `;
  } else if (page === pages && pages > 1) {
    button = createPageButtons(page, "left");
  }

  elements.comicPages.insertAdjacentHTML("afterbegin", button);

  //toggle aria hidden
  elements.comicPages.attributes["aria-hidden"].value == "true"
    ? elements.comicPages.setAttribute("aria-hidden", false)
    : elements.comicPages.setAttribute("aria-hidden", true);
};

export const renderComicResults = (comics, page = 1, resPerPage = 4) => {
  //render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  comics.slice(start, end).forEach(renderComic);

  //render pagination buttons
  renderPageButtons(page, comics.length, resPerPage);
};
