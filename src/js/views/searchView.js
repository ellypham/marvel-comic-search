import { elements } from "./base";

// Autocomplete
let currentFocus;

const searchCharacter = async (searchText) => {
  currentFocus = -1;
  const characters = await fetch("./data/characters.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });

  // Get matches to current text input
  let matches = characters.filter((char) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return char.match(regex);
  });

  if (searchText.length === 0) {
    matches = 0;
    elements.autocompleteList.innerHTML = "";
  }

  outputHtml(matches, searchText);
};

// Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="autocomplete__card">
        <h4>${match}</h4>

      </div>
    `
      )
      .join("");
    elements.autocompleteList.innerHTML = html;

    const list = elements.autocompleteList.getElementsByTagName("div");

    list.forEach((item) => {
      item.addEventListener("click", (e) => {
        elements.searchInput.value = item.getElementsByTagName(
          "h4"
        )[0].innerHTML;
        elements.autocompleteList.innerHTML = "";
      });
    });
  }
};

// Autocomplete Event Listener
elements.searchInput.addEventListener("input", () =>
  searchCharacter(elements.searchInput.value)
);

const addActive = (x) => {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  /*add class "autocomplete-active":*/
  x[currentFocus].classList.add("autocomplete-active");
};

const removeActive = (x) => {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
};

elements.searchInput.addEventListener("keydown", (e) => {
  let x = elements.autocompleteList;
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(x);
  } else if (e.keyCode == 13) {
    if (currentFocus > -1) {
      if (x)
        elements.searchInput.value = x[currentFocus].getElementsByTagName(
          "h4"
        )[0].innerHTML;
      elements.autocompleteList.innerHTML = "";
    }
  }
});

// export const getInput = () => {
//   elements.searchInput.value;
// };

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResult.innerHTML = "";
};

// update to display none instead
// when modal is closed display block
export const hideFeature = () => {
  elements.feature.style.display = "none";
};
// back to search function will display featured characters again
export const showFeature = () => {
  elements.feature.style.display = "block";
};

export const renderCharacterResult = (character) => {
  const markup = `
    <div class="container">
      <div class="character__info">
      <figure>
        <img src=${character.thumbnail.path}.${character.thumbnail.extension} >
      </figure>
      <div class="character__copy">
        <a href="#feature" class="back">Back to Search</a>
        <h2>${character.name}</h2>
        <p>${character.description}</p>
      </div>
      </div>
    </div>
  `;
  elements.searchResult.insertAdjacentHTML("afterbegin", markup);
};

export const renderErrorMessage = (search) => {
  const markup = `
    <div class="container">
      <div class="character__info">
        <h2>${search} cannot be found</h2>
      </div>
      </div>
    </div>
  `;
  elements.searchResult.insertAdjacentHTML("afterbegin", markup);
};
