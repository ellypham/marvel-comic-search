import Search from "./models/Search";
import Comics from "./models/Comics";
import List from "./models/List";
import * as searchView from "./views/searchView";
import * as comicsView from "./views/comicsView";
import * as listView from "./views/listView";

import { elements, renderLoader, clearLoader } from "./views/base";

const state = {};

/*
 * Search Controller
 */

const controlSearch = async (e) => {
  e.preventDefault();
  let query;
  if (e.target.closest(".search")) {
    query = elements.searchInput.value;
    console.log("query", query);
  } else if (e.target.closest(".featured-characters__card")) {
    query = e.target.closest(".featured-characters__card").dataset.charname;
  }

  searchView.clearInput();
  searchView.hideFeature();

  state.search = new Search(query);

  if (query) {
    try {
      await state.search.getResults();
      renderLoader(elements.searchResult);
      searchView.renderCharacterResult(state.search.result[0]);
      controlComics();
    } catch (error) {
      console.log(error);
    }
  }
};

elements.searchResult.addEventListener("click", (e) => {
  console.log("search e", e.target.matches(".back"));
  if (e.target.matches(".back")) {
    searchView.showFeature();
    searchView.clearResults();
    comicsView.clearResults();
  }
});

/*
 * Comics Controller
 */

const controlComics = async () => {
  const charId = state.search.result[0].id;
  state.comicResults = new Comics(charId);

  if (charId) {
    try {
      // renderLoader(elements.comicsSection);
      await state.comicResults.getComics();
      comicsView.renderComicResults(state.comicResults.comicResults);
      clearLoader();
    } catch (error) {
      console.log(error);
    }
  }
};

const paginationButtons = (e) => {
  const btn = e.target.closest(".btn__pagination");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    comicsView.clearResults();
    comicsView.renderComicResults(state.comicResults.comicResults, goToPage);
  }
};

/*
 * List Controller
 */
// For testing purposes
window.state = state;

const controlList = (e) => {
  const comic = e.target.closest(".btn__list, btn__list *");
  const comicName = comic.previousSibling.previousSibling.innerHTML;
  const comicImg =
    comic.previousSibling.previousSibling.previousSibling.previousSibling.src;

  if (!state.list) state.list = new List();

  state.list.addItem(comicName, comicImg);
  listView.clearResults();
  state.list.items.forEach((el) => {
    listView.renderItem(el);
  });
};

//delete item from reading list
elements.readList.addEventListener("click", (e) => {
  const id = e.target.closest(".read__item").dataset.itemid;
  if (e.target.matches(".btn__delete, .btn__delete *")) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  }
});

//toggle item from reading list
elements.readList.addEventListener("change", (e) => {
  const id = e.target.parentElement.parentElement.dataset.itemid;
  state.list.toggleItem(id);
  listView.toggleItem(id);
});

elements.readListBtn.addEventListener("click", () => {
  listView.showReadList();
});

//
elements.panelCloseBtn.addEventListener("click", listView.hideReadList);

//handlers
elements.searchForm.addEventListener("submit", controlSearch);
elements.featureList.addEventListener("click", controlSearch);
elements.comicPages.addEventListener("click", paginationButtons);
elements.comicResults.addEventListener("click", controlList);
