import { elements } from "./base";

export const clearResults = () => {
  elements.readList.innerHTML = "";
};

export const renderItem = (item) => {
  const markup = `
    <li class='read__item' >
      <input type='checkbox' id='read'/>
      <img src=${item.img} />
      <p>${item.title}</p>
      <button class='btn__delete' data-itemid=${item.id}>delete</button>
    </li>
  `;

  elements.readList.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const li = document.querySelector(".read__item");
  const deleteItem = document.querySelector(`[data-itemid="${id}"]`);
  if (deleteItem) li.parentElement.removeChild(deleteItem.parentElement);
};
