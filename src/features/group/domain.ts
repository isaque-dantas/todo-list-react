import type {TaskGroupWithoutItems} from "../../shared/types.ts";

export function taskGroupToSendFactory(): TaskGroupWithoutItems {
  return {
    id: '',
    name: '',
    userId: ''
  }
}