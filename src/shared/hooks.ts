import {useCallback, useEffect, useState} from "react";
import type {CacheContextData, CacheEntity, TaskGroupWithItems, TaskItemData, User} from "./types.ts";
import {get} from "./services/api-service.ts";
import {getToken, isAuthenticated} from "./services/auth-service.ts";
import {useCache, useCacheDispatcher} from "./contexts/cache-context.ts";

import {makeCacheRequest, shouldUseCache} from "./services/cache-service.ts";

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
  return users !== null ? users.filter(u => u.id === getToken())[0] : null
}

export function useGet(url: string, callback: (data: any) => void, withAuthentication: boolean = true) {
  const cache = useCache()
  const dispatch = useCacheDispatcher()
  const entityName = url.split('/')[0].split('?')[0] as ('items' | 'groups' | 'users')
  const isSingleElementRequest = url.includes('/')

  const shouldUseCacheResult = shouldUseCache(cache, entityName, url);

  const callbackWithMapper = useCallback(
    (data: any) => {
      if (!isSingleElementRequest) {
        callback(data)
        return;
      }

      const urlId = url.split('/')[1].split('?')[0];
      const dataToReturn = (
        (data as CacheContextData[CacheEntity])?.filter(e => e.id === urlId)[0]
      )

      callback(dataToReturn)
    },
    [callback]
  )

  useEffect(() => {
      if (!shouldUseCacheResult) return;
      makeCacheRequest(cache!, entityName, url, callbackWithMapper, withAuthentication)
    }, [entityName, url, callbackWithMapper, cache]
  );

  useEffect(
    () => {
      if (shouldUseCacheResult) return;
      get(url, withAuthentication)
        .then(data => {
          if (url.includes('/')) data = [data]
          dispatch!({type: 'onGet', data, entityName, id: null})
          return data
        })
        .then(callbackWithMapper)
    },
    [url, callbackWithMapper, withAuthentication, entityName, dispatch]
  )
}
