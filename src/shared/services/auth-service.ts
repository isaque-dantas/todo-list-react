import type {LoginForm, User} from "../types.ts";
import {get} from "./api-service.ts";

export async function login(form: LoginForm) {
  const users: User[] = await get(`users?email:eq=${form.email}&password:eq=${form.password}`)
  if (users.length == 0) return { message: "E-mail e/ou senha incorretos." }

  const user = users[0]
  localStorage.setItem('token', user.id)

  return null;
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated(): boolean {
  return localStorage.getItem('token') !== null;
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function addAuthenticationToUrl(url: string): string {
  if (!isAuthenticated()) return url
  const prefix = url.startsWith('users') ? 'id' : 'userId';

  if (url.includes('?')) return url + `&${prefix}=` + getToken();
  return url + `?${prefix}=` + getToken();
}

export function addAuthenticationToBody(data: any): any {
  if (!isAuthenticated()) return data;
  return {...data, userId: getToken()}
}
