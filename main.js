//IIFE, will be invoked automatically on startup
(function initSite() {
  bindDialogButtons();
  bindTableRowsClicks();
  renderOrdersTable();
  renderCustomersOptions();
  renderProductsOptions();
})();

// initialization functions

function bindDialogButtons() {
  // binding the open dialog button
  bindClickEvent("dialog-trigger", () => openDialog());

  // binding the "cancel" action inside the dialog
  bindClickEvent("cancel-order-button", () => closeDialog());

  // binding the "submit" action inside the dialog
  document.getElementById("new-order-form").addEventListener("submit", (event) => {
    event.preventDefault();
    onSaveOrderHandler();
  });
}

function bindTableRowsClicks() {
  bindClickEvent("customers-table-body", (eventData) => {
    if (eventData.target.tagName === "TD") {
      const orderRow = eventData.target.parentElement;
      const idCell = orderRow.firstElementChild;
      const idOfOrder = idCell.textContent;
      openDialog(idOfOrder);
    }
  });
}

function renderOrdersTable() {
  // fetching required dom elements
  const tableHeadCells = document.getElementById("customers-table-head").querySelectorAll("th");
  const tableBody = document.getElementById("customers-table-body");

  // emptying the table of pre-existing data
  clearAllChildrenOfElement(tableBody);

  // for each order we have we'll generate a single table row
  existingOrders.forEach((order) => {
    const tableRow = document.createElement("tr");
    tableHeadCells.forEach((headCell) => {
      const rowCell = document.createElement("td");
      rowCell.textContent = order[headCell.dataset.key];
      tableRow.appendChild(rowCell);
    });

    // appending the order row to the table's body
    tableBody.appendChild(tableRow);
  });
}

function renderCustomersOptions() {
  fillSelectListWithOptions("customer", existingCustomers);
}

function renderProductsOptions() {
  fillSelectListWithOptions("product", existingProducts);
}

function onSaveOrderHandler() {
  const formData = new FormData(document.getElementById("new-order-form"));

  const customer = findTextOfSelectItemById(existingCustomers, formData.get("customer"));
  const product = findTextOfSelectItemById(existingProducts, formData.get("product"));

  // generating order object from our form fields
  const orderInfo = {
    id: generateNumericValue(),
    customer,
    address: formData.get("address"),
    product,
    price: formData.get("price"),
    notes: formData.get("notes"),
  };

  const editingItemId = formData.get("edit-order-id");
  if (editingItemId != null && editingItemId.length > 0) {
    // if this is an editing of existing order we should replace the old entry with the new one
    orderInfo.id = editingItemId;
    const indexOfOrder = existingOrders.findIndex((order) => order.id === orderInfo.id);
    existingOrders.splice(indexOfOrder, 1, orderInfo);
  } else {
    // if this is a new order we should just push it into the array
    existingOrders.push(orderInfo);
  }

  renderOrdersTable();
  closeDialog();
}

function openDialog(predefinedOrderId) {
  if (predefinedOrderId != null) {
    const orderToEdit = existingOrders.find((order) => order.id === predefinedOrderId);
    populateFormWithExistingOrder(orderToEdit);
  }
  const dialogContainer = document.getElementById("dialog-container");
  dialogContainer.style.display = "flex";
}

function closeDialog() {
  const dialogContainer = document.getElementById("dialog-container");
  dialogContainer.style.display = "none";
  resetForm();
}

function populateFormWithExistingOrder(orderToEdit) {
  setOrderFormValues({
    customer: findIdOfSelectItemByText(existingCustomers, orderToEdit.customer),
    address: orderToEdit.address,
    product: findIdOfSelectItemByText(existingProducts, orderToEdit.product),
    price: orderToEdit.price,
    notes: orderToEdit.notes,
    "edit-order-id": orderToEdit.id,
  });
}

function resetForm() {
  setOrderFormValues({ customer: "", address: "", product: "", price: "", notes: "", "edit-order-id": "" });
}

function setOrderFormValues(values) {
  const orderForm = document.getElementById("new-order-form");
  orderForm.querySelector("[name=customer]").value = values.customer;
  orderForm.querySelector("[name=address]").value = values.address;
  orderForm.querySelector("[name=product]").value = values.product;
  orderForm.querySelector("[name=price]").value = values.price;
  orderForm.querySelector("[name=notes]").value = values.notes;
  orderForm.querySelector("[name=edit-order-id]").value = values["edit-order-id"];
}

// event handlers

function onSelectedCustomer(selectedCustomerId) {
  const foundCustomer = existingCustomers.find((customer) => customer.id === selectedCustomerId);
  document.getElementById("new-order-form").querySelector("[name=address]").value = foundCustomer.address;
}

function onSelectedProduct(selectedProductId) {
  const foundProduct = existingProducts.find((product) => product.id === selectedProductId);
  document.getElementById("new-order-form").querySelector("[name=price]").value = foundProduct.price;
}
