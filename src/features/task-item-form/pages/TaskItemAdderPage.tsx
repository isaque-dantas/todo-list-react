import {TaskItemForm} from "../components/TaskItemForm.tsx";
import type {TaskItemToSend} from "../../../shared/types.ts";
import {post} from "../../../shared/services/api-service.ts";
import { useNavigate } from 'react-router';
import {Link} from "@radix-ui/themes";

export function TaskItemAdderPage() {
  const navigate = useNavigate();

  function handleSubmit(item: TaskItemToSend) {
    post('items', item)
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700">Adicionar tarefa</h1>
      <p className="mt-4 text-lg">Deseja <Link onClick={() => navigate("/grupos/adicionar")}>adicionar um grupo de tarefas</Link>?</p>
      <TaskItemForm onSubmit={handleSubmit}/>
    </main>
  )
}