function buildSearchUrl() {
  const search_text = document.getElementById("search-text");

  const category_checkboxes = document.querySelectorAll(".category-checkbox");
  let selected_categories = [];

  category_checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const idIndex = checkbox.id.indexOf("-") + 1;
      selected_categories.push(checkbox.id.substr(idIndex));
    }
  });

  const min_price = document.getElementById("min-price");
  const max_price = document.getElementById("max-price");

  let url = "/api/offer?";

  if (search_text.value) {
    url += `search_text=${search_text.value}&`;
  }

  if (min_price.value) {
    url += `min_price=${min_price.value}&`;
  }

  if (max_price.value) {
    url += `max_price=${max_price.value}&`;
  }

  let categoryString = "";
  selected_categories.forEach((category) => {
    categoryString += category + ";";
  });

  url += `categories=${categoryString}`;

  return url;
}

async function fetchCategories() {
  const url = "/api/offer/categories";

  const headers = {
    "content-type": "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();

  let html = "";

  for (let key in json) {
    const checkbox_id = json[key].id;
    const checkbox_label = json[key].name;

    html += `
      <div class="checkbox">
        <li>
          <input id=${checkbox_id} class="category-checkbox" type="checkbox">
          <label>${checkbox_label}</label>
        </li>
      </div>
      `;
  }

  document.getElementById("categoriesList").innerHTML = html;
}

async function fetchOffers() {
  const url = buildSearchUrl();
  console.log(url);

  const headers = {
    "content-type": "application/json",
  };

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();

  let html = "";

  for (let key in json) {
    const offer_id = json[key].id;
    const offer_img = json[key].photo;
    const offer_name = json[key].name;
    const offer_desc = json[key].description;
    const offer_price = json[key].price;

    html += `
      <div class="offer">
        <a href="/offer/${offer_id}">
          <img src="${offer_img}">
        </a>
        <div class="offer-desc">
          <a href="/offer/${offer_id}">
            <h1>${offer_name}</h1>
          </a>
          <p>${offer_desc}</p>
        </div>
        <div class="offer-right-section">
          <p>Cena: ${offer_price}zł</p>
        </div>
      </div>
      `;
  }

  if (html === "") {
    html = "<h1>Nie znaleziono żadnych ofert dla podanych kryteriów!<h1>";
  }

  document.getElementById("offers").innerHTML = html;
}

window.onload = function () {
  fetchCategories();
  fetchOffers();
  const search_button = document.getElementById("search-button");
  search_button.addEventListener("click", fetchOffers);
};
