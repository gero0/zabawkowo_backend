let chatWindow;
let chatId = 0;
let my_data = {};
let recipient_data = {};
let lastTimestamp = 0;
let messageHTML = "";

async function fetchAllMessages() {
  const response = await fetch(`/api/chat/${chatId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: document.cookie,
    },
  });

  const json = await response.json();

  const date = new Date();

  lastTimestamp = date.toISOString();

  return json;
}

async function update() {
  const response = await fetch(
    `/api/chat/${chatId}/update?timestamp=${lastTimestamp}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: document.cookie,
      },
    }
  );

  const date = new Date();

  lastTimestamp = date.toISOString();

  const json = await response.json();

  return json;
}

function displayMessages(json) {
  const messages = json.chat.messages;

  for (const message of messages) {
    let msgClass;
    if (message.sender_id == my_data.id) {
      msgClass = "message message-right";
    } else {
      msgClass = "message";
    }
    messageHTML += `<div class='message-box'><div class='${msgClass}'>${message.text}</div></div>`;
  }

  chatWindow.innerHTML = messageHTML;
}

async function sendMessage() {
  const textArea = document.getElementById("message-input-ta");

  if (textArea.value == "") {
    return;
  }

  const response = await fetch(`/api/chat/${chatId}/send`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: document.cookie,
    },
    body: JSON.stringify({
      content: textArea.value,
      timestamp: lastTimestamp,
    }),
  });

  let json = await response.json();

  if (json.status !== "OK") {
    console.log(json.status);
  }

  textArea.value = "";

  json = await update();

  displayMessages(json);
}

window.onload = async function () {
  chatWindow = document.getElementById("chat-window");

  const url = window.location.href;
  const lastSlashIndex = url.lastIndexOf("/");
  chatId = url.substring(lastSlashIndex + 1);

  const json = await fetchAllMessages();

  my_data = json.my_data;
  recipient_data = json.recipient_data;

  const chatUsername = document.getElementById("chat-username");
  chatUsername.innerHTML = "Rozmawiasz z: " + recipient_data.username;

  displayMessages(json);

  setInterval(async function () {
    const json = await update();
    displayMessages(json);
  }, 6000);

  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", sendMessage);
};
