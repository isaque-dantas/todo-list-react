import {addAuthenticationToBody, addAuthenticationToUrl} from "./auth-service.ts";

const baseUrl = 'http://localhost:3000/'

export async function get(url: string, withAuthentication: boolean = true) {
  try {
    const res = await fetch(
      baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url)
    );

    return await res.json();
  } catch (err) {
    return console.error(err);
  }
}

export async function post(url: string, data: any) {
  data = addAuthenticationToBody(data)

  try {
    const res = await fetch(
      baseUrl + url,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }
    );

    return await res.json();
  } catch (err) {
    return console.error(err);
  }
}

export function put(url: string, data: any, withAuthentication: boolean = true) {
  fetch(
    baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url),
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }
  )
    .catch((err) => console.error(err));
}

export function remove(url: string) {
  fetch(
    baseUrl + addAuthenticationToUrl(url),
    { method: "DELETE" }
  )
    .catch((err) => console.error(err));
}
