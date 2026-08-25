import type {
  CacheContextData,
  CacheDispatcherAction,
  CacheEntity, TaskGroupWithItems,
} from "../types.ts";

export function cacheContextDataFactory(): CacheContextData {
  return {
    items: null,
    groups: null,
    users: null
  }
}

function mergeState(prevState: CacheContextData, newState: CacheContextData[CacheEntity], entityName: CacheEntity): CacheContextData {
  const prevEntities = prevState[entityName] as NonNullable<CacheContextData[CacheEntity]>
  if (prevEntities === null) {
    return {...prevState, [entityName]: newState};
  }

  const prevIds = prevEntities.map(e => e.id)
  const entitiesNotInCache = newState!.filter(
    entity => !prevIds.includes(entity.id)
  )

  if (entitiesNotInCache.length === 0) return prevState;
  return {
    ...prevState,
    [entityName]: [...prevEntities, ...entitiesNotInCache]
  }
}

function mergeApiResponse(prevState: CacheContextData, entityName: CacheEntity, data: NonNullable<CacheContextData[CacheEntity]>): CacheContextData {
  let state = mergeState(prevState, data, entityName)
  if (entityName !== 'groups') return state;

  (data as TaskGroupWithItems[])
    .forEach(group => {
      if (!group.items) return group;
      state = mergeState(state, group.items, 'items')
    })

  return state
}

export function cacheReducer(prevState: CacheContextData, action: CacheDispatcherAction): CacheContextData {
  let prevEntities = prevState[action.entityName]
  if (prevEntities === null && ['add', 'update', 'remove'].includes(action.type)) return prevState;

  prevEntities = (prevEntities as NonNullable<CacheContextData[CacheEntity]>)

  const handlers = {
    add() {
      return {...prevState, [action.entityName]: [...prevEntities, ...action.data]}
    },

    update() {
      const updatedEntities = (
        prevEntities
          .map(entity => {
            if (entity.id === action.id) return action.data[0];
            return entity;
          })
      )

      return {...prevState, [action.entityName]: updatedEntities}
    },

    remove() {
      return {
        ...prevState,
        [action.entityName]: (
          prevEntities.filter(entity => entity.id !== action.id)
        )
      }
    },

    onGet: () => mergeApiResponse(prevState, action.entityName, action.data)
  }

  const handler = handlers[action.type];
  if (handler === undefined) return prevState;

  return handler()
}

export function getIntIfPossible(value: string) {
  const parsed = parseInt(value);
  return Number.isNaN(parsed) ? value : parsed;
}

export function makeCacheRequest(cache: CacheContextData, entityName: CacheEntity, url: string, callback: (data: any) => unknown) {
  if (!url.includes('?')) {
    callback(cache[entityName])
    return;
  }

  const params = (
    url
      .split('?')[1]
      .split('&')
      .map(param => {
          if (param.includes(':eq=')) {
            return {
              key: param.split(':eq=')[0],
              value: getIntIfPossible(param.split(':eq=')[1])
            };
          } else if (param.includes('_embed')) {
            return {
              key: 'embed',
              value: param.split('_embed=')[1] as CacheEntity
            }
          }
        }
      )
  )

  const entities = (
    cache[entityName]
      ?.filter(
        e => params.every(p => {
          if (!p) return false;

          // @ts-ignore
          if (p.key !== 'embed') return e[p.key] === p.value;
          return true;
        })
      )
      ?.map(e => {
        const nested: CacheEntity[] = (
          params
            .filter(p => !!p && p.key === 'embed')
            .map(p => p!.value as CacheEntity)
        )

        if (nested.length === 0) return e;
        const entityId = {key: entityName.slice(0, entityName.length - 1) + 'Id', value: e['id']};

        const nestedEntities: CacheContextData = {items: null, groups: null, users: null};
        nested.forEach((nestedEntityName: CacheEntity) => {
          // @ts-ignore
          nestedEntities[nestedEntityName] = (
            cache[nestedEntityName]
              ?.filter(nestedEntity => {
                // @ts-ignore
                return nestedEntity[entityId.key] === entityId.value
              })
          )
        });

        return {
          ...e,
          ...nestedEntities
        }
      })
  )

  callback(entities)
}

export function shouldUseCache(cache: CacheContextData | null, entityName: CacheEntity, url: string) {
  const match = url.match(/(?<=\?_embed=)(?:(?!&).)+/)
  const embeddedEntityName = match ? match[0] as CacheEntity : null

  // console.log('embeddedEntityName', embeddedEntityName)
  // console.log('cache[embedded]', cache == null || embeddedEntityName == null ? null : cache[embeddedEntityName])

  return (
    cache !== null &&
    cache[entityName] !== null
    &&
    (
      embeddedEntityName === null ||
      (
        cache[embeddedEntityName] !== undefined &&
        cache[embeddedEntityName] !== null
      )
    )
  )
}