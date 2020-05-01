import Search from './models/Search';
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
      searchView.renderCharacterResult(state.search.result[0])
    } catch (error) {
      console.log(error)
    }
  }
}


//handlers
elements.searchForm.addEventListener('submit', controlSearch);

