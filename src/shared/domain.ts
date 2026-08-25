import type {
  TaskGroupWithoutItems,
  TaskItemData,
} from "./types.ts";

export function taskGroupToSendFactory(): TaskGroupWithoutItems {
  return {
    id: '',
    name: '',
    userId: ''
  }
}

export function taskItemFactory(groupId: string = ''): TaskItemData {
  return {
    id: '',
    content: '',
    isDone: false,
    groupId: groupId,
    userId: ''
  }
}

export function getTaskItemFromTaskItemToSend(id: string, item: TaskItemData): TaskItemData{
  return {
    ...item,
    id,
  }
}
