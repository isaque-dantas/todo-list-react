import type {NestedTaskItemData, TaskGroupData, TaskGroupToSend, TaskItemToSend} from "./types.ts";

export function taskGroupFactory(): TaskGroupData {
  return {
    id: '',
    name: '',
    items: [],
    userId: ''
  }
}

export function taskGroupToSendFactory(): TaskGroupToSend {
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