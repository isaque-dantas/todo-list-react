import type {TaskGroupData, TaskGroupToSend} from "../../shared/types.ts";

export function getToSend(data: TaskGroupData): TaskGroupToSend {
  return {
    id: data.id,
    name: data.name,
    userId: data.userId,
  }
}