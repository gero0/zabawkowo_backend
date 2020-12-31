import ErrorMap from "./errors.js";
import { buildJson, postRequest, postFile } from "./helpers.js";

async function submit_offer(event) {
  event.preventDefault();

  const form = document.getElementById("offerForm");
  const submit_button = document.getElementById("form-submit");
  submit_button.disabled = true;
  setTimeout(() => {
    submit_button.disabled = false;
  }, 2000);

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

  const url = window.location.href;
  const lastSlashIndex = url.lastIndexOf("/");
  const idIndex = url.lastIndexOf("/", lastSlashIndex - 1) + 1;
  const offer_id = url.substring(idIndex, lastSlashIndex);

  const form_response = await postRequest(
    `/api/offer/${offer_id}/edit`,
    headers,
    json
  );

  if (form_response.status !== "OK") {
    const errorBox = document.getElementById("form-error");
    const errorString = ErrorMap[form_response.status];
    errorBox.innerHTML = `<p class="errorText">${errorString}</p>`;
    return;
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
    const errorBox = document.getElementById("login-error");
    const errorString = ErrorMap[form_response.status];
    errorBox.innerHTML = `<p class="errorText">${errorString}</p>`;
    return;
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
