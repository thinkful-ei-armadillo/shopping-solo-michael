'use strict';

const STORE = {
  items: [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}],
  hideChecked: false
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="js-item-edit">
            <span class="button-label">edit</span>
        </button>
        <button class="js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}

function toggleHideChecked(){
  STORE.hideChecked = !STORE.hideChecked;
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  let filteredItems = [...STORE.items];

  if(STORE.hideChecked){
    filteredItems = filteredItems.filter(function(item) {
      return item.checked === false;
    });
  }

  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function searchFor(query){
  let searchResults = [];

  if(STORE.items.includes(query)){
    searchResults = searchResults.append();
    }
  
    console.log(`\`searchFor\` ran with: ${query}`);
  renderShoppingList();
}

function handleNewItemSearch(){
  $('#js-shopping-list-form2').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSearch` ran');
    const searchName = $('.js-shopping-list-search').val();
    console.log(`User searched for ${searchName}`);
    searchFor(searchName);
    renderShoppingList();
  })
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(itemIndex){
    console.log(`Deleting item at ${itemIndex} from list`);
    STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
    console.log('`handleDeleteItemClicked` ran')
  });
}

/*
function editItem(itemIndex){
  console.log(`Editing item at ${itemIndex}`);
  STORE.items[itemIndex] = ' '; //change to user's input
}
*/

function handleEditClicked(){
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //editItem(itemIndex);
    renderShoppingList();
    console.log('`handleEditClicked` ran');
  });
}

function handleToggleCheck(){
  $('#hide-completed-checkbox').click(() => {
    console.log('handleToggleCheck ran');
    toggleHideChecked();
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleNewItemSearch();
  handleItemCheckClicked();
  handleEditClicked();
  handleDeleteItemClicked();
  handleToggleCheck();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);