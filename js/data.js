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
  shoppingList = shoppingList.filter((item) => {
    if (item.id === listItem.id) return false;
    return true;
  });

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

  image.classList.add("wiggle");
  setTimeout(() => {
    image.classList.remove("wiggle");
  }, 500);
}

function clearAllItems(wrapper, image) {
  localStorage.setItem(localStorageKey, JSON.stringify(""));
  shoppingList = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  wrapper.classList.add("clear-all");
  image.classList.add("spin");

  setTimeout(() => {
    wrapper.classList.remove("clear-all");
    image.classList.remove("spin");
    renderShoppingList();
  }, 1200);
}

export { shoppingList, updateLocalStorage, removeItem, addItem, clearAllItems };
