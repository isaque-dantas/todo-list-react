import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {TaskGroupWithoutItems} from "../../../shared/types.ts";
import {groupEndpoints} from "./endpoints.ts";
import {GROUP_QUERY_KEY} from "./queries.ts";

export function useGroupCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: TaskGroupWithoutItems) => groupEndpoints.create(group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.ALL })
    }
  })
}

export function useGroupUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: TaskGroupWithoutItems) => groupEndpoints.update(group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.ALL })
    }
  })
}

export function useGroupRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => groupEndpoints.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.ALL })
  })
}