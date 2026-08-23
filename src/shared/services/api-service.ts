import {useEffect} from "react";
import {addAuthenticationToBody, addAuthenticationToUrl} from "./auth-service.ts";

const baseUrl = 'http://localhost:3000/'

export function useGet(url: string, callback: (data: any) => void, withAuthentication: boolean = true) {
  useEffect(() => { get(url, withAuthentication).then(callback) }, [url, callback])
}

export function get(url: string, withAuthentication: boolean = true) {
  return fetch(
    baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url)
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
