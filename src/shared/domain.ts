import type {
  CacheContextData,
  CacheDispatcherAction, CacheEntity,
  NestedTaskItemData,
  TaskGroupWithItems,
  TaskGroupWithoutItems, TaskItemData,
  TaskItemToSend
} from "./types.ts";

export function taskGroupFactory(): TaskGroupWithItems {
  return {
    id: '',
    name: '',
    items: [],
    userId: ''
  }
}

export function taskGroupToSendFactory(): TaskGroupWithoutItems {
  return {
    id: '',
    name: '',
    userId: ''
  }
}

export function nestedTaskItemFactory(): NestedTaskItemData {
  return {
    id: '',
    content: '',
    isDone: false
  }
}

export function taskItemFactory(groupId: string = ''): TaskItemToSend {
  return {
    id: '',
    content: '',
    isDone: false,
    groupId: groupId,
    userId: ''
  }
}

export function getTaskItemFromTaskItemToSend(id: string, item: TaskItemToSend): TaskItemData{
  return {
    ...item,
    id,
  }
}

export function cacheContextDataFactory(): CacheContextData {
  return {
    items: null,
    groups: null,
    users: null
  }
}

export function cacheReducer(prevState: CacheContextData, action: CacheDispatcherAction) : CacheContextData{
  let prevEntities = prevState[action.entityName]
  if (prevEntities === null && ['add', 'update', 'remove'].includes(action.type)) return prevState;

  prevEntities = (prevEntities as NonNullable<CacheContextData[CacheEntity]>)

  const handlers = {
    add() {
      return {...prevState, [action.entityName]: [...prevEntities, action.data]}
    },

    update() {
      const updatedEntities = (
        prevEntities
          .map(entity => {
            if (entity.id === action.id) return action.data[0];
            return entity;
          })
      )

      return { ...prevState, [action.entityName]: updatedEntities }
    },

    remove() {
      return {
        ...prevState,
        [action.entityName]: (
          prevEntities.filter(entity => entity.id !== action.id)
        )
      }
    },

    onGet() {
      if (prevEntities === null) {
        return {...prevState, [action.entityName]: action.data};
      }

      const prevIds = prevEntities.map(e => e.id)
      const entitiesNotInCache = action.data.filter(entity => !prevIds.includes(entity.id))
      if (entitiesNotInCache.length === 0) return prevState;

      return {
        ...prevState,
        [action.entityName]: [...prevEntities, ...entitiesNotInCache]
      }
    }
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
        // @ts-ignore
        e => params.every(p => {
          if (!p) return false;

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
        const nestedEntitiesId = nested.map(e => e.slice(0, entityName.length - 1) + 'Id');

        const nestedEntities = {
          [id]: cache[]
        }

        return {
          ...e,
          ...{

          }
        }
      })
  )

  console.log('valor retornado pelo cache', url, entities)
  callback(entities)
}