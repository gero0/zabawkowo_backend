function search() {
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

  let url = "/offer?";

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

  window.location.href = url;
}

window.onload = function () {
  const search_button = document.getElementById("search-button");
  search_button.addEventListener("click", search);
};
