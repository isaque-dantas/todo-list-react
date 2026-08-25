import type {
  TaskGroupWithoutItems,
  TaskItemData,
  TaskItemToSend
} from "./types.ts";

export function taskGroupToSendFactory(): TaskGroupWithoutItems {
  return {
    id: '',
    name: '',
    userId: ''
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
