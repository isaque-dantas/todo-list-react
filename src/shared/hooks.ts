import {useEffect, useState} from "react";
import type {TaskGroupWithItems, TaskItemData, User} from "./types.ts";
import {get} from "./services/api-service.ts";
import {isAuthenticated} from "./services/auth-service.ts";
import {useCache, useCacheDispatcher} from "./contexts/cache-context.ts";
import {makeCacheRequest} from "./domain.ts";

export function useItems(options: string = '') {
  const [items, setItems] = useState<TaskItemData[] | null>(null);
  useGet(`items${options}`, setItems)
  return items
}

export function useGroups(options: string  = ''): TaskGroupWithItems[] | null {
  const [groups, setGroups] = useState<TaskGroupWithItems[] | null>(null);
  useGet(`groups${options}`, setGroups)
  return groups
}

export function useAuthenticatedUser() {
  const [users, setUsers] = useState<User[] | null>(null);
  useGet('users', setUsers)

  if (!isAuthenticated()) return null;
  return users !== null ? users[0] : null
}

export function useGet(url: string, callback: (data: any) => void, withAuthentication: boolean = true) {
  const cache = useCache()
  const dispatch = useCacheDispatcher()
  const entityName = url.split('/')[0].split('?')[0] as ('items' | 'groups' | 'users')

  useEffect(() => {
      if (cache !== null && cache[entityName] !== null) {
        makeCacheRequest(cache, entityName, url, callback)
        console.log('cache!')
      }
    }, [entityName, url, callback, cache]
  );

  useEffect(
    () => {
      get(url, withAuthentication)
        .then(data => {
          console.log('api!')
          dispatch!({type: 'onGet', data, entityName, id: null})
          return data
        })
        .then(callback)
    },
    [url, callback, withAuthentication, entityName, dispatch]
  )
  return;
}
