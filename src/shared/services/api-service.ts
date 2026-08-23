import {useEffect} from "react";
import {addAuthenticationToBody, addAuthenticationToUrl} from "./auth-service.ts";

const baseUrl = 'http://localhost:3000/'

export function useGet(url: string, callback: (data: any) => void) {
  useEffect(() => { get(url).then(callback) }, [url, callback])
}

export function get(url: string) {
  return fetch(
    baseUrl + addAuthenticationToUrl(url)
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

export function post(url: string, data: any) {
  data = addAuthenticationToBody(data)

  fetch(
    baseUrl + url,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }
  )
    .catch((err) => console.error(err));
}

export function put(url: string, data: any) {
  fetch(
    baseUrl + addAuthenticationToUrl(url),
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
