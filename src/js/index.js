import Search from './models/Search';
import Comics from './models/Comics';
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

//handlers
elements.searchForm.addEventListener('submit', controlSearch);

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

