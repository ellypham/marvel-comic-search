export const elements = {
  searchForm: document.querySelector(".search"),
  readListBtn: document.querySelector(".btn__read-list"),
  feature: document.querySelector(".featured-characters"),
  featureList: document.querySelector(".featured-characters__list"),
  searchInput: document.querySelector(".search__field"),
  searchResult: document.querySelector(".search__result"),
  comicsSection: document.querySelector(".comics"),
  comicResults: document.querySelector(".comics__results"),
  comicPages: document.querySelector(".comics__pages"),
  readList: document.querySelector(".read__list"),
  readPanel: document.querySelector(".read__panel"),
  panelCloseBtn: document.querySelector(".btn__close-read-panel"),
  autocompleteList: document.getElementById("autocomplete__list"),
  autocompleteCard: document.querySelector(".autocomplete__card"),
};

export const elementStrings = {
  loader: "loader-wrapper",
};

export const renderLoader = (parent) => {
  const loader = `
    <div class='${elementStrings.loader}'>
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  loader.classList.add("fadeout");
  if (loader) {
    loader.classList.add("fadeout");
    setTimeout(() => {
      loader.parentElement.removeChild(loader);
    }, 1000);
  }
};
