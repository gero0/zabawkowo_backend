import { buildJson, postRequest, postFile } from "./helpers.js";

async function submit_offer(event) {
  event.preventDefault();

  const form = document.getElementById("offerForm");
  const submit_button = document.getElementById("form-submit");
  submit_button.disabled = true;
  setTimeout(() => {
    submit_button.disabled = false;
  }, 2000);

  //TODO: Validation

  console.log(localStorage.getItem("token"));
  const headers = {
    "content-type": "application/json",
    authorization: document.cookie,
  };

  let json = buildJson(form);

  const category_checkboxes = document.querySelectorAll(".category-checkbox");

  let selected_categories = [];

  category_checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const idIndex = checkbox.id.indexOf("-") + 1;
      selected_categories.push(checkbox.id.substr(idIndex));
    }
  });

  json = { ...json, categories: selected_categories };

  const form_response = await postRequest("/api/offer/create", headers, json);

  if (form_response.status !== "OK") {
    //TODO: ADD ERROR BOX
    console.log("AN ERROR occured");
  }
  const offerId = form_response.offer_id;

  let photo = document.getElementById("file-selector").files[0];

  if (!photo) {
    window.location.href = `/offer/${offerId}`;
    return;
  }

  const imgHeader = {
    authorization: document.cookie,
  };

  const img_response = await postFile(
    `/api/offer/${offerId}/upload-photo`,
    imgHeader,
    photo
  );

  if (img_response.status !== "OK") {
    //TODO: ADD ERROR BOX
    console.log("Could not upload photo!");
  }

  window.location.href = `/offer/${offerId}`;
}

function fileSelected(event) {
  const preview = document.getElementById("img-preview");
  const fr = new FileReader();
  fr.addEventListener(
    "load",
    () => {
      preview.src = fr.result;
    },
    false
  );
  fr.readAsDataURL(event.target.files[0]);
}

window.onload = function () {
  const fileSelector = document.getElementById("file-selector");
  fileSelector.addEventListener("change", fileSelected);
  const submit_button = document.getElementById("form-submit");
  submit_button.addEventListener("click", submit_offer);
};
