import {TaskGroupForm} from "../components/TaskGroupForm.tsx";
import {post} from "../../../shared/services/api-service.ts";
import type {TaskGroupToSend} from "../../../shared/types.ts";

export function TaskGroupAdderPage() {
  function handleSubmit(group: TaskGroupToSend) {
    post('groups', group)
  }

  return (
   <main>
     <h1 className="text-4xl font-medium text-indigo-700">Adicionar grupo</h1>
      <TaskGroupForm onSubmit={handleSubmit}/>
   </main>
  )
}