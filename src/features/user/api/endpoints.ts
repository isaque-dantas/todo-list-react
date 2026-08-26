import {get, post, put, remove} from "../../../shared/services/api-service.ts";
import type {User} from "../../../shared/types.ts";

export const userEndpoints = {
  list: () => get<User[]>('users', false),
  detail: () => get<User>(`users`, true),
  create: (user: User) => post<User>('users', user),
  remove: () => remove<void>(`users`),
  update: (user: User) => put<User>(`users`, user),
}
