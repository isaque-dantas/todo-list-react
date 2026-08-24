import type {TaskGroupWithItems, TaskGroupWithoutItems} from "../../shared/types.ts";

export function getToSend(data: TaskGroupWithItems): TaskGroupWithoutItems {
  return {
    id: data.id,
    name: data.name,
    userId: data.userId,
  }
}