import {useQuery} from "@tanstack/react-query";
import {userEndpoints} from "./endpoints.ts";

export const USER_QUERY_KEY = {
  ALL: ["user"],
  LIST: ["user", "list"],
  DETAIL: (id: string) => ["user", "detail", id] as const,
}

export function useUserList() {
  return useQuery({
    queryFn: userEndpoints.list,
    queryKey: USER_QUERY_KEY.LIST
  })
}

export function useUserDetail(id: string) {
  return useQuery({
    queryFn: userEndpoints.detail,
    queryKey: USER_QUERY_KEY.DETAIL(id)
  })
}
