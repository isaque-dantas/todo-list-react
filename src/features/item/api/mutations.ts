import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {TaskItemData} from "../../../shared/types.ts";
import {taskItemEndpoints} from "./endpoints.ts";
import {ITEM_QUERY_KEY} from "./queries.ts";

export function useItemCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: TaskItemData) => taskItemEndpoints.create(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEY.ALL })
    }
  })
}

export function useItemUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: TaskItemData) => taskItemEndpoints.update(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEY.ALL })
    }
  })
}

export function useItemRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskItemEndpoints.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ITEM_QUERY_KEY.ALL })
  })
}