import {TaskItemForm} from "../components/TaskItemForm.tsx";
import type {TaskItemToSend} from "../../../shared/types.ts";
import {post} from "../../../shared/services/api-service.ts";

export function TaskItemAdderPage() {
  function handleSubmit(item: TaskItemToSend) {
      post('items', item)
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700">Adicionar tarefa</h1>
      <TaskItemForm onSubmit={handleSubmit}></TaskItemForm>
    </main>
  )
}