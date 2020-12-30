import ErrorMap from "./errors.js";
import { buildJson, postRequest } from "./helpers.js";

async function submit_login(event) {
  event.preventDefault();

  const form = document.getElementById("login-form");
  const submit_button = document.getElementById("submit-login");
  submit_button.disabled = true;
  setTimeout(() => {
    submit_button.disabled = false;
  }, 2000);

  const headers = {
    "content-type": "application/json",
  };

  const json = buildJson(form);

  const form_response = await postRequest("/api/user/login", headers, json);

  if (form_response.status !== "OK") {
    const errorBox = document.getElementById("login-error");
    const errorString = ErrorMap[form_response.status];
    errorBox.innerHTML = `<p class="errorText">${errorString}</p>`;
    return;
  }

  document.cookie = `token=${form_response.token}`;
  //TODO: perhaps change to user page?
  window.location.href = `/`;
}

async function submit_register(event) {
  event.preventDefault();

  const form = document.getElementById("register-form");
  const submit_button = document.getElementById("submit-register");
  submit_button.disabled = true;
  setTimeout(() => {
    submit_button.disabled = false;
  }, 2000);

  const headers = {
    "content-type": "application/json",
  };

  const json = buildJson(form);

  const form_response = await postRequest("/api/user/register", headers, json);

  if (form_response.status !== "OK") {
    const errorBox = document.getElementById("register-error");
    const errorString = ErrorMap[form_response.status];
    errorBox.innerHTML = `<p class="errorText">${errorString}</p>`;
    return;
  }

  document.cookie = `token=${form_response.token}`;

  window.location.href = `/`;
}

window.onload = function () {
  const login_submit_btn = document.getElementById("submit-login");
  login_submit_btn.addEventListener("click", submit_login);

  const register_submit_button = document.getElementById("submit-register");
  register_submit_button.addEventListener("click", submit_register);
};
