import {TaskItemForm} from "../components/TaskItemForm.tsx";
import {useParams} from "react-router";
import {put} from "../../../shared/services/api-service.ts";
import {useGet} from "../../../shared/hooks.ts";
import {useState} from "react";
import type {TaskItemToSend} from "../../../shared/types.ts";
import {Spinner} from "@radix-ui/themes";
import {useCacheDispatcher} from "../../../shared/contexts/cache-context.ts";
import {getTaskItemFromTaskItemToSend} from "../../../shared/domain.ts";

export function TaskItemEditorPage() {
  const {id} = useParams();
  const [item, setItem] = useState<TaskItemToSend | null>(null)
  useGet(`items/${id}`, setItem)

  const dispatch = useCacheDispatcher()

  function handleSubmit(editedItem: TaskItemToSend) {
    put(`items/${id}`, editedItem)
    dispatch!({
      type: 'update',
      data: [getTaskItemFromTaskItemToSend(id!, editedItem)],
      id: id!,
      entityName: 'items'
    })
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700">Editar tarefa</h1>
      {
        item === null
          ?
          <p>Carregando...<Spinner/></p>
          :
          <TaskItemForm
            onSubmit={handleSubmit}
            defaultValues={item}
          />
      }
    </main>
  )
}