import {TaskItemForm} from "../components/TaskItemForm.tsx";
import type {TaskItemToSend} from "../../../shared/types.ts";
import {post} from "../../../shared/services/api-service.ts";
import { Link as RRLink } from "react-router";
import { Link as RULink } from '@radix-ui/themes'

export function TaskItemAdderPage() {
  function handleSubmit(item: TaskItemToSend) {
    post('items', item)
  }

  return (
    <main>
        <h1 className="text-4xl font-medium text-indigo-700">Adicionar tarefa</h1>
        <p className="mt-4 text-lg">Deseja <RRLink to="/grupos/adicionar"><RULink>adicionar um grupo de tarefas</RULink></RRLink>?</p>
      <TaskItemForm onSubmit={handleSubmit}></TaskItemForm>
    </main>
  )
}