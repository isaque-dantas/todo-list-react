import type {TaskItemData} from "../../shared/types.ts";

export function taskItemFactory(groupId: string = ''): TaskItemData {
  return {
    id: '',
    content: '',
    isDone: false,
    groupId: groupId,
    userId: ''
  }
}