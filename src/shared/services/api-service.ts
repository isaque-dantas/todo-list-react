import {addAuthenticationToBody, addAuthenticationToUrl} from "./auth-service.ts";

const baseUrl = 'http://localhost:3000/'

export async function get<T>(url: string, withAuthentication: boolean = true): Promise<T | undefined> {
  try {
    const res = await fetch(
      baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url)
    );

    return await res.json();
  } catch (err) {
    throw err;
  }
}

export async function post<T>(url: string, data: any): Promise<T | undefined> {
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
    console.error(err);
  }
}

export async function put<T>(url: string, data: any, withAuthentication: boolean = true): Promise<T | undefined>{
  try {
    const res = await fetch(
      baseUrl + (withAuthentication ? addAuthenticationToUrl(url) : url),
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }
    )
    
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function remove<T>(url: string): Promise<T | undefined> {
  try {
    const res = await fetch(
      baseUrl + addAuthenticationToUrl(url),
      { method: "DELETE" }
    )

    return await res.json()
  } catch (err) {
    console.error(err);
  }
}
