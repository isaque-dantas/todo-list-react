import {get, post, put, remove} from "../../../shared/services/api-service.ts";
import type {User} from "../../../shared/types.ts";

export const userEndpoints = {
  list: () => get<User[]>('users', false),
  detail: async () => {
    const data = await get<User[]>('users', true);
    return data !== undefined ? data[0] : undefined;
  },
  create: (user: User) => post<User>('users', user),
  remove: (id: string) => remove<void>(`users/${id}`),
  update: (user: User) => put<User>(`users/${user.id}`, user),
}
