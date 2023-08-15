// localStorage
const localStorageKey = "shoppingList";
// sync shoppinglist with localstorage
let shoppingList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

function updateLocalStorage() {
  // update local storage:
  localStorage.setItem(localStorageKey, JSON.stringify(shoppingList));
}

// Remove item from the array
function removeItem(listItem) {
  shoppingList = shoppingList.filter((item) => item.id !== listItem.id);

  updateLocalStorage();
}

// add item, with a unique id based on current timestamp
function addItem(listItem, image) {
  shoppingList.push({
    name: listItem,
    id: Date.now(),
    greyedOut: false,
    newItem: true,
  });

  // toggles shopping basket animation on and off
  image.classList.add("wiggle");
  setTimeout(() => {
    image.classList.remove("wiggle");
  }, 500);
}

// toggles greyed out state
function greyedOutToggle(item, listItem) {
  if (!item.greyedOut) {
    listItem.classList.add("line-through");
    item.greyedOut = true;
  } else {
    listItem.classList.remove("line-through");
    item.greyedOut = false;
  }
}

// appends trash can svg to button
function appendSvg(element) {
  fetch("./images/delete.svg")
    .then((response) => response.text())
    .then((svgContent) => {
      const svgDocument = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml"
      );

      const svgElement = svgDocument.documentElement;
      svgElement.classList.add("delete-svg");
      element.append(svgElement);
    })
    .catch((error) => {
      console.error("Error loading SVG:", error);
    });
}

// toggles fade out and removes list item
function fadeAndRemove(item, listItem) {
  listItem.classList.add("fade-out");
  setTimeout(() => {
    listItem.remove();
    removeItem(item);
  }, 400);
}

// removes all list items from page
function clearAllItems(wrapper, image) {
  localStorage.setItem(localStorageKey, JSON.stringify(""));
  shoppingList = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  wrapper.classList.add("clear-all");
  image.classList.add("spin");

  setTimeout(() => {
    wrapper.classList.remove("clear-all");
    image.classList.remove("spin");
    wrapper.replaceChildren();
  }, 1200);
}

export {
  shoppingList,
  updateLocalStorage,
  addItem,
  clearAllItems,
  greyedOutToggle,
  appendSvg,
  fadeAndRemove,
};
