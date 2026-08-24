import {TaskItemForm} from "../components/TaskItemForm.tsx";
import type {TaskItemData, TaskItemToSend} from "../../../shared/types.ts";
import {post} from "../../../shared/services/api-service.ts";
import { useNavigate } from 'react-router';
import {Link} from "@radix-ui/themes";
import {useCacheDispatcher} from "../../../shared/contexts/cache-context.ts";

export function TaskItemAdderPage() {
  const navigate = useNavigate();
  const dispatch = useCacheDispatcher()

  function handleSubmit(item: TaskItemToSend) {
    post('items', item)
      .then((data: TaskItemData) => {
        dispatch!({
          type: 'add',
          data: [data],
          entityName: 'items',
          id: null,
        })
      })
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700">Adicionar tarefa</h1>
      <p className="mt-4 text-lg">Deseja <Link onClick={() => navigate("/grupos/adicionar")}>adicionar um grupo de tarefas</Link>?</p>
      <TaskItemForm onSubmit={handleSubmit}/>
    </main>
  )
}