import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(title, img) {
    const item = {
      id: uniqid(),
      read: false,
      title,
      img,
    };
    this.items.push(item);

    // persist data
    this.persistData();

    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);

    // persist data
    this.persistData();
  }

  toggleItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items[index].read = !this.items[index].read;

    // persist data
    this.persistData();
  }

  getNumItems() {
    return this.items.length;
  }

  persistData() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("items"));

    // Restoring items from localStorage
    if (storage) this.items = storage;
    console.log("storage", storage);
  }
}
