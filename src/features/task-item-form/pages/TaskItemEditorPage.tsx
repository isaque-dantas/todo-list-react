import {TaskItemForm} from "../components/TaskItemForm.tsx";
import {useParams} from "react-router";
import {put, useGet} from "../../../shared/services/api-service.ts";
import {useState} from "react";
import type {TaskItemToSend} from "../../../shared/types.ts";
import {Spinner} from "@radix-ui/themes";

export function TaskItemEditorPage() {
  const {id} = useParams();
  const [item, setItem] = useState<TaskItemToSend | null>(null)
  useGet(`items/${id}`, setItem)

  function handleSubmit(editedItem: TaskItemToSend) {

    put(`items/${id}`, editedItem)
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