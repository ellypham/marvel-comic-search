import Search from './models/Search';
import Comics from './models/Comics';
import * as searchView from './views/searchView';
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
      console.log('state ', state.search.result);
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
  state.characterId = new Comics(charId);
  
  if(charId) {
    try {
      await state.characterId.getComics();
    } catch (error) {
      console.log(error);
    }
  }
};

