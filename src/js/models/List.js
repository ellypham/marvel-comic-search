import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(title, img) {
    const item = { 
      id: uniqid(),
      read: false,
      title,  
      img 
    }
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
  }

  toggleItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items[index].read = !this.items[index].read;
  }

  getNumItems() {
    return this.items.length;
  }

}