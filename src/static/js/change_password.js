import ErrorMap from "./errors.js";
import {buildJson, postRequest} from './helpers.js'

async function submit_forgot(event){
  event.preventDefault();

  const form = document.getElementById('forgot-form');
  const submit_button = document.getElementById("submit-forgot")
  submit_button.disabled = true;
  setTimeout(() => {submit_button.disabled = false}, 2000)

  const headers = {
    "content-type": "application/json"
  };

  const json = buildJson(form);

  const url = window.location.href;

  const token = url.substring(url.lastIndexOf('/')+1);

  const form_response = await postRequest(`/api/user/change-password/${token}`, headers, json);

  if (form_response.status !== "OK") {
    const errorBox = document.getElementById("form-error");
    const errorString = ErrorMap[form_response.status];
    errorBox.innerHTML = `<p class="errorText">${errorString}</p>`;
    return;
  }

  window.location.href = `/login`;
}

window.onload = function(){
  const forgot_submit_btn = document.getElementById("submit-forgot");
  forgot_submit_btn.addEventListener("click", submit_forgot);
}