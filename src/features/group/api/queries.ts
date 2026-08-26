import {useQuery} from "@tanstack/react-query";
import {groupEndpoints} from "./endpoints.ts";

export const GROUP_QUERY_KEY = {
  ALL: ["group"],
  LIST: (shouldEmbedItems: boolean) => ["group", "list", (shouldEmbedItems ? 'withItems' : '')] as const,
  DETAIL: (id: string) => ["group", "detail", id] as const,
}

interface UseGroupListParams {
  shouldEmbedItems: boolean;
}

export function useGroupList({shouldEmbedItems}: UseGroupListParams) {
  return useQuery({
    queryFn: () => groupEndpoints.list(shouldEmbedItems),
    queryKey: GROUP_QUERY_KEY.LIST(shouldEmbedItems),
  })
}

export function useGroupDetail(id: string) {
  return useQuery({
    queryFn: () => groupEndpoints.detail(id),
    queryKey: GROUP_QUERY_KEY.DETAIL(id)
  })
}
