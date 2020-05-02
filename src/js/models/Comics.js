import axios from 'axios';

export default class Comics {
  constructor(id) {
    this.id = id;
  }

  async getComics() {
    const publickey = 'b225687f4bb5b86654a2184eb87aa18b';
    try {
      const res = await axios (`https://gateway.marvel.com/v1/public/characters/${this.id}/comics?apikey=${publickey}`);
      console.log('comics res ', res.data.data.results);
    } catch (error) {
      console.log(error);
    }
  } 
}