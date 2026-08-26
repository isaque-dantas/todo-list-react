import {getToken} from "./services/auth-service.ts";
import {useUserDetail} from "../features/user/api/queries.ts";

export function useAuthenticatedUser() {
  const userId = getToken()
  if (!userId) return null;

  const {data: user, isLoading} = useUserDetail(userId);
  return isLoading || user === undefined ? null : user!
}

// export function useGet(url: string, callback: (data: any) => void, withAuthentication: boolean = true) {
//   const cache = useCache()
//   const dispatch = useCacheDispatcher()
//   const entityName = url.split('/')[0].split('?')[0] as ('items' | 'groups' | 'users')
//   const isSingleElementRequest = url.includes('/')
//
//   const shouldUseCacheResult = shouldUseCache(cache, entityName, url);
//
//   const callbackWithMapper = useCallback(
//     (data: any) => {
//       if (!isSingleElementRequest) {
//         callback(data)
//         return;
//       }
//
//       const urlId = url.split('/')[1].split('?')[0];
//       const dataToReturn = (
//         (data as CacheContextData[CacheEntity])?.filter(e => e.id === urlId)[0]
//       )
//
//       callback(dataToReturn)
//     },
//     [callback]
//   )
//
//   useEffect(() => {
//       if (!shouldUseCacheResult) return;
//       makeCacheRequest(cache!, entityName, url, callbackWithMapper, withAuthentication)
//     }, [entityName, url, callbackWithMapper, cache]
//   );
//
//   useEffect(
//     () => {
//       if (shouldUseCacheResult) return;
//       get(url, withAuthentication)
//         .then(data => {
//           if (url.includes('/')) data = [data]
//           dispatch!({type: 'onGet', data, entityName, id: null})
//           return data
//         })
//         .then(callbackWithMapper)
//     },
//     [url, callbackWithMapper, withAuthentication, entityName, dispatch]
//   )
// }
