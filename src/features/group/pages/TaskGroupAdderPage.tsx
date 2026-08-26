import {TaskGroupForm} from "../components/TaskGroupForm.tsx";
import type {TaskGroupWithoutItems} from "../../../shared/types.ts";
import {useGroupCreate} from "../api/mutations.ts";

export function TaskGroupAdderPage() {
  const {mutate} = useGroupCreate()

  function handleSubmit(group: TaskGroupWithoutItems) {
    mutate(group)
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700">Adicionar grupo</h1>
      <TaskGroupForm onSubmit={handleSubmit}/>
    </main>
  )
}