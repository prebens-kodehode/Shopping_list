import {
  shoppingList,
  updateLocalStorage,
  removeItem,
  addItem,
  clearAllItems,
  greyedOutToggle,
  appendSvg,
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

// clears all items when shopping basket is double clicked
basketImg.addEventListener("dblclick", () => {
  clearAllItems(itemWrapper, basketImg);
});

function renderShoppingList() {
  // clears the container
  itemWrapper.replaceChildren();

  shoppingList.forEach(createListItems);
}

// render a single list item
function createListItems(item) {
  const listItem = document.createElement("li");
  listItem.id = item.id;

  // check if item is greyed out
  if (item.greyedOut) {
    listItem.classList.add("line-through");
  }

  // create span with item as content
  const span = document.createElement("span");
  span.textContent = item.name;

  // toggles greyed out state
  span.addEventListener("click", () => {
    greyedOutToggle(item, listItem);
    updateLocalStorage();
  });

  // remove button
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");

  // appends trash can svg to button
  appendSvg(removeButton);

  // toggles fade out and removes list item
  removeButton.addEventListener("click", () => {
    listItem.classList.add("fade-out");
    setTimeout(() => {
      listItem.remove();
      removeItem(item);
    }, 400);
  });

  //checks if item is new and adds fade in
  if (item.newItem) {
    listItem.classList.add("fade-in");
    item.newItem = false;
  }

  // appends span and button to list item
  listItem.append(span, removeButton);

  // appends list item to unordered list
  itemWrapper.append(listItem);
}

renderShoppingList();
