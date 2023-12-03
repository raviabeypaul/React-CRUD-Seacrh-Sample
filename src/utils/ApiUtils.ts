export const get = async (url : string, headers : any) => {
  let response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  let data = await response.json();
  return data;
};

export const post = async (url : string, headers: any, body : any) => {
  let response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  let data = await response.json();
  return data;
};

export const put = async (url : string, headers : any, body : any) => {
  let response = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: await JSON.stringify(body),
  });
  let data = await response.json();
  return data;
};
