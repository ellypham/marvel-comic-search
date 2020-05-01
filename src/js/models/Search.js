import axios from "axios";

//Elly's
// marvelApp.privateKey = 'f9ca9667e8e04e4184b2b1a7c98aff351c4c3f0a';
// marvelApp.publicKey = 'b225687f4bb5b86654a2184eb87aa18b';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const publickey = 'b225687f4bb5b86654a2184eb87aa18b';
    try {
      const res = await axios(`https://gateway.marvel.com/v1/public/characters?name=${this.query}&apikey=${publickey}`);
      this.result = res.data.data.results;
      console.log('api res ', this.result);
    } catch (error) {
      console.log(error);
    }
  }

}