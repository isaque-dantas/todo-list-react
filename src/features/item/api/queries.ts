import {useQuery} from "@tanstack/react-query";
import {taskItemEndpoints} from "./endpoints.ts";
import {queryDefaultOptions} from "../../../shared/api.defaults.ts";

export const ITEM_QUERY_KEY = {
  ALL: ["item"],
  LIST: ["item", "list"],
  DETAIL: (id: string) => ["item", "detail", id] as const,
}

export function useItemList() {
  return useQuery({
    queryFn: taskItemEndpoints.list,
    queryKey: ITEM_QUERY_KEY.LIST,
    ...queryDefaultOptions
  })
}

export function useItemDetail(id: string) {
  return useQuery({
    queryFn: () => taskItemEndpoints.detail(id),
    queryKey: ITEM_QUERY_KEY.DETAIL(id),
    ...queryDefaultOptions
  })
}
