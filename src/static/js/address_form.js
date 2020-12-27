import ErrorMap from "./errors.js";
import { buildJson, postRequest } from "./helpers.js";

async function submit_form(event) {
  event.preventDefault();

  const form = document.getElementById("address-form");
  const submit_button = document.getElementById("submit-form");
  submit_button.disabled = true;
  setTimeout(() => {
    submit_button.disabled = false;
  }, 2000);

  const headers = {
    "content-type": "application/json",
    authorization: document.cookie,
  };

  const json = buildJson(form);

  const form_response = await postRequest(
    "/api/user/add-address",
    headers,
    json
  );

  if (form_response.status !== "OK") {
    const errorBox = document.getElementById("form-error");
    const errorString = ErrorMap[form_response.status];
    errorBox.innerHTML = `<p class="errorText">${errorString}</p>`;
  } else {
    window.location.href = `/user`;
  }
}

window.onload = function () {
  const form_submit_btn = document.getElementById("submit-form");
  form_submit_btn.addEventListener("click", submit_form);
};
