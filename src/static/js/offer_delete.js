import { postRequest } from "./helpers.js";

async function deleteOffer(){
  event.preventDefault();

  const url = window.location.href;
  const lastSlashIndex = url.lastIndexOf("/");
  const offer_id = url.substring(lastSlashIndex+1);

  const headers = {
    "content-type": "application/json",
    authorization: document.cookie,
  };

  const response = await postRequest(
    `/api/offer/${offer_id}/delete`,
    headers,
    {}
  );

  window.location.href = '/';
}

window.onload = function () {
  const delete_btn = document.getElementById("offer-delete-button");
  delete_btn.addEventListener("click", deleteOffer);
};