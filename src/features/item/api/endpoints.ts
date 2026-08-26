import {get, post, put, remove} from "../../../shared/services/api-service.ts";
import type {TaskItemData} from "../../../shared/types.ts";

type ListResponse = TaskItemData[];
type DetailResponse = TaskItemData;
type PostResponse = TaskItemData;
type RemoveResponse = null;
type PutResponse = TaskItemData;

export const taskItemEndpoints = {
  list: () => get<ListResponse>('items', true),
  detail: (id: string) => get<DetailResponse>(`items/${id}`, true),
  create: (item: TaskItemData) => post<PostResponse>('items', item),
  remove: (id: string) => remove<RemoveResponse>(`items/${id}`),
  update: (item: TaskItemData) => put<PutResponse>(`items/${item.id}`, item),
}
