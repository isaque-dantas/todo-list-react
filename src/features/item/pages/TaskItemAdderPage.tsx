import {TaskItemForm} from "../components/TaskItemForm.tsx";
import type {TaskItemData} from "../../../shared/types.ts";
import { useNavigate } from 'react-router';
import {Link} from "@radix-ui/themes";
import {useItemCreate} from "../api/mutations.ts";

export function TaskItemAdderPage() {
  const navigate = useNavigate();
  const {mutate} = useItemCreate()

  function handleSubmit(item: TaskItemData) {
    mutate(item)
  }

  return (
    <main>
      <h1 className="text-4xl font-medium text-indigo-700">Adicionar tarefa</h1>
      <p className="mt-4 text-lg">Deseja <Link onClick={() => navigate("/grupos/adicionar")}>adicionar um grupo de tarefas</Link>?</p>
      <TaskItemForm onSubmit={handleSubmit}/>
    </main>
  )
}