// helper utils

function clearAllChildrenOfElement(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

function fillSelectListWithOptions(idOfList, informationArray) {
  const selectField = document.getElementById(idOfList);
  clearAllChildrenOfElement(selectField);
  selectField.appendChild(generateSelectOption("", "Please select..."));
  informationArray.forEach((entry) => {
    const selectOption = generateSelectOption(entry.id, entry.text);
    selectField.appendChild(selectOption);
  });
}

function generateSelectOption(id, text) {
  const optionElement = document.createElement("option");
  optionElement.value = id;
  optionElement.textContent = text;
  return optionElement;
}

function bindClickEvent(elementId, callback) {
  document.getElementById(elementId).addEventListener("click", callback);
}

function findTextOfSelectItemById(listOfOptions, itemId) {
  return listOfOptions.find((option) => option.id === itemId).text;
}

function findIdOfSelectItemByText(listOfOptions, text) {
  return listOfOptions.find((option) => option.text === text).id;
}

const generateNumericValue = (() => {
  let value = 1;
  return () => `${value++}`;
})();
