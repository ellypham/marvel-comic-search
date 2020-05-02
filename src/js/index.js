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
  console.log({query});
  
  state.search = new Search(query);

  if(query) {
    try {
      await state.search.getResults();
      console.log('state ', state.search);
      searchView.renderCharacterResult(state.search.result[0]);
      controlComics();
      console.log('state comics ', state.characterId);
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
      console.log('state search comic results', state.comicResults.comicResults)
      comicsView.renderComicResults(state.comicResults.comicResults)
    } catch (error) {
      console.log(error);
    }
  }
};

