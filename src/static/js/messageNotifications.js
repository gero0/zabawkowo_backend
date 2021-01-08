async function checkMessageNotifications() {
  const messageButton = document.getElementById("messages-button");

  const response = await fetch(`/api/chat/notifications`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: document.cookie,
    },
  });

  const json = await response.json();

  if (json.status == "OK" && json.count != 0) {
    messageButton.innerHTML = `Wiadomości...<div class='message-notification-circle'>${json.count}</div>`;
    return;
  }

  messageButton.innerHTML = "Wiadomości...";
}
