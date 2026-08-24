import {TaskGroupForm} from "../components/TaskGroupForm.tsx";
import {post} from "../../../shared/services/api-service.ts";
import type {TaskGroupWithoutItems} from "../../../shared/types.ts";
import {useCacheDispatcher} from "../../../shared/contexts/cache-context.ts";

export function TaskGroupAdderPage() {
  const dispatch = useCacheDispatcher()

  function handleSubmit(group: TaskGroupWithoutItems) {
    post('groups', group)
      .then((data: TaskGroupWithoutItems) => {
        dispatch!({
          type: 'add',
          data: [data],
          entityName: 'groups',
          id: null,
        })
      })
  }

  return (
   <main>
     <h1 className="text-4xl font-medium text-indigo-700">Adicionar grupo</h1>
      <TaskGroupForm onSubmit={handleSubmit}/>
   </main>
  )
}