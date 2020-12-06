export function buildJson(form) {
  const jsonData = {};
  for (const pair of new FormData(form)) {
    jsonData[pair[0]] = pair[1];
  }
  return jsonData;
}

export async function postRequest(link, headers, body, nostringify=false) {
  if (!link || !headers || !body) {
    console.log("ERROR posting json");
    return;
  }

  try {
    const response = await fetch(link, {
      method: "POST",
      headers: headers,
      body: nostringify ? body : JSON.stringify(body),
    });

    const content = await response.json();
    return content;
  } catch (err) {
    console.log(`ERROR POSTing! : ${err}`);
    throw err;
  }
}

export async function postFile(link, headers, file) {
  if (!link || !headers || !file) {
    console.log("ERROR posting json");
    return;
  }

  let formData = new FormData();
  formData.append("file", file);

  //IMPORTANT: You must NOT set content type for it to work properly

  const response = await fetch(link, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  return await response.json();
}