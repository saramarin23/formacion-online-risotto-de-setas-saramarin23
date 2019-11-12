"use strict";

// let btn = document.querySelector(".button");
let title = document.querySelector(".recipe-title");
const data = "../../service/data.json";

function fetchData() {
  fetch(data)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      title.innerHTML = data.name;
    });
}

window.addEventListener("load", fetchData);
