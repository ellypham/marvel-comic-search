import { elements } from "./base";

export const clearResults = () => {
  elements.readList.innerHTML = "";
};

export const showReadList = () => {
  elements.readPanel.style.width = "50%";
  console.log("show read list");
};

export const hideReadList = () => {
  elements.readPanel.style.width = "0%";
  console.log("hide read list");
};

export const renderItem = (item) => {
  const markup = `
    <li class='read__item' data-itemid=${item.id}>
      <input type='checkbox' id='read'/>
      <img src=${item.img} />
      <p>${item.title}</p>
      <button class='btn__delete'>
        <i class="fas fa-times fa-2x"></i>
      </button>
    </li>
  `;

  elements.readList.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};

export const toggleItem = (id) => {
  const toggleItem = document.querySelector(`[data-itemid="${id}"]`);
  if (toggleItem) toggleItem.classList.toggle("read__item-strike");
};
