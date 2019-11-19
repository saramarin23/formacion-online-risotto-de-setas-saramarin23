"use strict";

// app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap

let title = document.querySelector(".recipe-title");
const data = "../../service/data.json";
let shipping = 7;

let select = document.getElementsByClassName("select")[0];
// console.log(select);
let unselect = document.getElementsByClassName("unselect")[0];

function fetchData(e) {
  e.preventDefault();
  const shippingCost = document.querySelector(".shipping-costs");
  fetch(data)
    .then(response => response.json())
    .then(data => {
      title.innerHTML = data.name;
      let products = document.querySelector(".products-list");
      let items = document.querySelector(".total-items");
      let subtotal = document.querySelector(".subtotal");
      //   let shippingCost = document.querySelector(".shipping-costs");
      let total = document.querySelector(".total");
      let buy = document.querySelector(".buy-btn");

      let ingredientItem = "";
      for (const ingredient of data.ingredients) {
        let productPrice = ingredient.price * ingredient.items;
        ingredientItem += `<li class="list-group-item list-item">
        <input class="form-check-input position-static checkbox" type="checkbox" checked>
        </input>
        <input type="number" class="input-quantity quantity" value=${
          ingredient.items
        } min="1"></input>
        <div class="ingredient-container">
            <p class="product">${ingredient.product}</p>
            <p class="product-brand">${ingredient.brand || "Sin marca"} </p>
            <span class="product-quantity">${ingredient.quantity}</span>
        </div>
        <p class="product-price">${productPrice}</p></li>`;
      }
      products.innerHTML = ingredientItem;
      //   subtotal.innerHTML;
      shippingCost.innerHTML += `<p> ${shipping} ${data.currency}</p>`;
      // total.innerHTML += `<p>${shippingCost.lastElementChild.innerHTML}</p>`;
      buy.innerHTML += shipping + data.currency;

      addQuantity();
      selectAllListener();
    });
}

window.addEventListener("load", fetchData);

function selectAllListener() {
  let checkboxes = document.querySelectorAll(".checkbox");
  for (let i = 0; checkboxes.length; i++) {
    console.log(checkboxes[i]);
    checkboxes[i].checked = 1;
  }
}

function unselectAllListener() {
  let checkboxes = document.querySelectorAll(".checkbox");
  for (let i = 0; checkboxes.length; i++) {
    checkboxes[i].checked = 0;
  }
}

function selectAllHandler(e) {
  console.log(e);
}

select.addEventListener("click", selectAllListener);
unselect.addEventListener("click", unselectAllListener);

function addQuantity() {
  const allNumberInputs = document.querySelectorAll(".quantity");
  allNumberInputs.forEach(numberInput =>
    numberInput.addEventListener("change", getPrice)
  );
}

function getPrice(e) {
  e.preventDefault();
  const thisPrice = event.srcElement.parentNode.lastChild.innerHTML;
  const quantity = parseInt(event.target.value);
  let priceItem = (parseFloat(thisPrice) * quantity).toFixed(2); //Lo deja en 2 decimales siempre
  console.log(quantity);

  let list = event.target.parentNode;
  let ingredientTotalPrice = "";
  ingredientTotalPrice += `<div><p>${priceItem}€</p></div>`;
  console.log(ingredientTotalPrice);
  list.innerHTML += ingredientTotalPrice;
  // fetchData();
}
