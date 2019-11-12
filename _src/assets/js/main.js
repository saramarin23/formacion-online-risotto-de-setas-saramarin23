"use strict";

// app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap

// let btn = document.querySelector(".button");
let title = document.querySelector(".recipe-title");
const data = "../../service/data.json";

function fetchData() {
  const shippingCost = document.querySelector(".shipping-costs");
  fetch(data)
    .then(response => response.json())
    .then(data => {
      //   console.log(data);
      title.innerHTML = data.name;
      let products = document.querySelector(".products-list");
      let items = document.querySelector(".total-items");
      let subtotal = document.querySelector(".subtotal");
      //   let shippingCost = document.querySelector(".shipping-costs");
      let total = document.querySelector(".total");
      let buy = document.querySelector(".buy-btn");

      let ingredientItem = "";
      for (const ingredient of data.ingredients) {
        // console.log(ingredient);
        ingredientItem += `<li class="list-group-item list-item">
        <button class="form-check-input position-static" type="checkbox">
        </button>
        <input type="number" class="input-quantity quantity" value="${
          ingredient.items
        }"></input>
        <div class="ingredient-container">
            <p class="product">${ingredient.product}</p>
            <p class="product-brand">${ingredient.brand}</p>
            <span class="product-quantity">${ingredient.quantity}</span>
        </div>
        <p class="product-price">${ingredient.price *
          ingredient.items} €</p></li>`;
        {
          console.log(ingredient.price * ingredient.items);
        }
      }
      products.innerHTML = ingredientItem;
      //   subtotal.innerHTML;
      shippingCost.innerHTML += `<p> 7,00 ${data.currency}</p>`;
      console.log(shippingCost.lastElementChild.innerHTML);
      total.innerHTML += `<p>${shippingCost.lastElementChild.innerHTML}</p>`;
      buy.innerHTML += total.lastElementChild.innerHTML;
    });
}

window.addEventListener("load", fetchData);
