let chatWindow;
let chatId = 0;
let my_data = {};
let recipient_data = {};
let lastTimestamp = "";
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
    lastTimestamp = message.send_date;
  }

  chatWindow.innerHTML = messageHTML;
}

async function sendMessage() {
  const textArea = document.getElementById("message-input-ta");
  
  if (textArea.value == "") {
    return;
  }

  const date = new Date();
  const timestamp = date.toISOString();
  
  const text = textArea.value;

  textArea.value = "";

  const response = await fetch(`/api/chat/${chatId}/send`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: document.cookie,
    },
    body: JSON.stringify({
      content: text,
      timestamp: timestamp,
    }),
  });
  
  let json = await response.json();
  
  if (json.status !== "OK") {
    console.log(json.status);
  }

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
  }, 1000);

  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", sendMessage);
};
