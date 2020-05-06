import { elements } from './base';

export const clearResults = () => {
  elements.readList.innerHTML = "";
}

export const renderItem = item => {
  const markup = `
    <li class='read__item' data-itemid=${item.id}>
      <img src=${item.img} />
      <p>${item.title}</p>
      <button class='btn__delete'>delete</button>
    </li>
  `

  elements.readList.insertAdjacentHTML('beforeend', markup);
}