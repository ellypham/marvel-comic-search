import { elements } from "./base";

export const clearResults = () => {
  elements.readList.innerHTML = "";
};

// Will hold previously focused element
let focusedElementBeforePanel;

export const showReadList = () => {
  // Save current focus
  focusedElementBeforePanel = document.activeElement;

  // Listen for and trap the keyboard
  // elements.readPanel.addEventListener("keydown", trapTabKey);

  // Find all focusable children
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  let focusableElements = elements.readPanel.querySelectorAll(
    focusableElementsString
  );

  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);
  console.log("focusableElements", focusableElements);

  const firstTabStop = focusableElements[0];
  console.log({ firstTabStop });
  const lastTabStop = focusableElements[focusableElements.length - 1];
  console.log({ lastTabStop });

  elements.readPanel.style.width = "90%";
  if (elements.readPanel.attributes["aria-hidden"].value == "true") {
    elements.readPanel.setAttribute("aria-hidden", "false");
  }

  // Focus first child
  firstTabStop.focus();
};

export const trapTabKey = (e) => {
  console.log("trapTabKey");
  // Check for TAB key press
  if (e.keyCode === 9) {
    console.log("tab key has been pressed");
    // SHIFT + TAB
    if (e.shiftkey) {
      if (document.activeElement === firstTabStop) {
        e.preventDefault();
        lastTabStop.focus();
      }
    }
  }

  // ESCAPE;
  if (e.keyCode === 27) {
    console.log("esc key has been pressed");
    hideReadList();
  }
};

export const hideReadList = () => {
  elements.readPanel.style.width = "0%";
  if (elements.readPanel.attributes["aria-hidden"].value == "false") {
    elements.readPanel.setAttribute("aria-hidden", "true");
  }

  focusedElementBeforePanel.focus();
};

export const renderItem = (item) => {
  const markup = `
    <li class='read__item ${
      item.read === true ? "read__item-strike" : ""
    }' data-itemid=${item.id}>
      <label>
        ${item.title}
        <input type='checkbox' id='read' class='read__checkbox' ${
          item.read === true ? "checked" : ""
        }/>
        <span class='read__checkmark'></span>
      </label>
      <img src=${item.img} alt=""/>
      <button class='btn__delete' aria-label="Delete from comic read list">
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
