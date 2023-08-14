import {
  shoppingList,
  updateLocalStorage,
  removeItem,
  addItem,
  clearAllItems,
} from "./data.js";

const inputForm = document.querySelector("#input-form");
const errorMessage = document.querySelector("#error");
const inputText = document.querySelector("#input-text");
const itemWrapper = document.querySelector("#item-wrapper");
const basketImg = document.querySelector("#basket-img");

inputForm.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();

  const itemText = inputText.value;

  // check if user entered enough characters
  if (itemText.length < 2) {
    errorMessage.textContent = "Please enter 2 or more characters";
    return;
  }
  // clear the error element
  errorMessage.textContent = "";
  // add the item to the array and localstorage
  addItem(itemText, basketImg);

  // render the new todolist
  renderShoppingList();
  // clear the input field:
  inputText.value = "";

  updateLocalStorage();
}

basketImg.addEventListener("dblclick", () => {
  clearAllItems(itemWrapper, basketImg);
});

function renderShoppingList() {
  // clear the container (to avoid duplications)
  itemWrapper.replaceChildren();

  shoppingList.forEach(createListItems);
}

// render a single list item
function createListItems(item) {
  const listItem = document.createElement("li");
  listItem.id = item.id;

  if (item.greyedOut) {
    listItem.classList.add("line-through");
  }

  const span = document.createElement("span");
  span.textContent = item.name;

  span.addEventListener("click", () => {
    if (!item.greyedOut) {
      listItem.classList.add("line-through");
      item.greyedOut = true;
    } else if (item.greyedOut) {
      listItem.classList.remove("line-through");
      item.greyedOut = false;
    }
    updateLocalStorage();
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");

  fetch("./images/delete.svg")
    .then((response) => response.text())
    .then((svgContent) => {
      const svgDocument = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml"
      );

      const svgElement = svgDocument.documentElement;
      svgElement.classList.add("delete-svg");
      removeButton.append(svgElement);
    })
    .catch((error) => {
      console.error("Error loading SVG:", error);
    });

  removeButton.addEventListener("click", () => {
    listItem.classList.add("fade-out");
    setTimeout(() => {
      listItem.remove();
      removeItem(item);
    }, 400);
  });

  if (item.newItem) {
    listItem.classList.add("fade-in");
    item.newItem = false;
  }

  listItem.append(span, removeButton);

  itemWrapper.append(listItem);
}

renderShoppingList();
