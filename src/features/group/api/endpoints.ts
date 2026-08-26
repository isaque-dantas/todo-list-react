import {get, post, put, remove} from "../../../shared/services/api-service.ts";
import type {TaskGroupWithItems, TaskGroupWithoutItems} from "../../../shared/types.ts";

type ListResponse = TaskGroupWithoutItems[] | TaskGroupWithItems[];
type DetailResponse = TaskGroupWithoutItems | TaskGroupWithItems;
type PostResponse = TaskGroupWithoutItems;
type RemoveResponse = null;
type PutResponse = TaskGroupWithoutItems;

export const groupEndpoints = {
  list: (shouldEmbedItems: boolean) => {
    const url = 'groups' + (shouldEmbedItems ? '?_embed=items' : '');
    return get<ListResponse>(url, true);
  },
  detail: (id: string) => get<DetailResponse>(`groups/${id}`, true),
  create: (group: TaskGroupWithoutItems) => post<PostResponse>('groups', group),
  remove: (id: string) => remove<RemoveResponse>(`groups/${id}`),
  update: (group: TaskGroupWithoutItems) => put<PutResponse>(`groups/${group.id}`, group),
}
