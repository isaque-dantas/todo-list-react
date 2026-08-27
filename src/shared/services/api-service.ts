import {addAuthenticationToBody, addAuthenticationToUrl} from "./auth-service.ts";

const baseUrl = 'http://localhost:3000/'

export async function get<T>(url: string, withAuthentication: boolean = true): Promise<T | undefined> {
  const res = await fetch(
    baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url)
  );

  if (!res.ok) return Promise.reject(new Error(res.statusText))
  return await res.json();
}

export async function post<T>(url: string, data: any): Promise<T | undefined> {
  data = addAuthenticationToBody(data)

  const res = await fetch(
    baseUrl + url,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }
  );

  if (!res.ok) return Promise.reject(new Error(res.statusText))
  return await res.json();
}

export async function put<T>(url: string, data: any, withAuthentication: boolean = true): Promise<T | undefined>{
  const res = await fetch(
    baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url),
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }
  )

  if (!res.ok) return Promise.reject(new Error(res.statusText))
  return await res.json();
}

export async function remove<T>(url: string): Promise<T | undefined> {
  const res = await fetch(
    baseUrl + addAuthenticationToUrl(url),
    { method: "DELETE" }
  )

  if (!res.ok) return Promise.reject(new Error(res.statusText))
  return await res.json()
}
