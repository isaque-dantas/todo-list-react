import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {User} from "../../../shared/types.ts";
import {userEndpoints} from "./endpoints.ts";
import {USER_QUERY_KEY} from "./queries.ts";

export function useUserCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => userEndpoints.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.ALL })
    }
  })
}

export function useUserUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => userEndpoints.update(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.ALL })
    }
  })
}

export function useUserRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userEndpoints.remove(id),
    onSuccess: () => queryClient.clear()
  })
}
