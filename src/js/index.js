import Search from './models/Search';
import Comics from './models/Comics';
import List from './models/List';
import * as searchView from './views/searchView';
import * as comicsView from './views/comicsView';
import { elements } from './views/base';

const state = {};

/*
* Search Controller
*/

const controlSearch = async (e) =>{
  e.preventDefault();
  const query = searchView.getInput();
  searchView.clearInput();
  console.log({query});
  
  state.search = new Search(query);

  if(query) {
    try {
      await state.search.getResults();
      searchView.clearResults();
      comicsView.clearResults();
      searchView.renderCharacterResult(state.search.result[0]);
      controlComics();
    } catch (error) {
      console.log(error)
    }
  }
}

/*
* Comics Controller
*/

const controlComics = async () => { 
  const charId = state.search.result[0].id
  state.comicResults = new Comics(charId);
  
  if(charId) {
    try {
      await state.comicResults.getComics();
      comicsView.renderComicResults(state.comicResults.comicResults)
    } catch (error) {
      console.log(error);
    }
  }
};

const paginationButtons = (e) => {

  const btn = e.target.closest('.btn__pagination');
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    comicsView.clearResults();
    comicsView.renderComicResults(state.comicResults.comicResults, goToPage);
  }
}

/*
* List Controller
*/
// For testing purposes
window.state = state

const controlList = (e) => {
  const comic = e.target.closest('.btn__list, btn__list *');
  const comicName = comic.previousSibling.previousSibling.innerHTML;
  const comicImg = comic.previousSibling.previousSibling.previousSibling.previousSibling.src;

  if(!state.list) state.list = new List();

  state.list.addItem(comicName, comicImg);

  console.log('state list', state.list)
  

  
}

//handlers
elements.searchForm.addEventListener('submit', controlSearch);
elements.comicPages.addEventListener('click', paginationButtons);
elements.comicResults.addEventListener('click', controlList);