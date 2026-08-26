import {TaskItemForm} from "../components/TaskItemForm.tsx";
import {useParams} from "react-router";
import type {TaskItemData} from "../../../shared/types.ts";
import {Button, Spinner} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {useItemDetail} from "../api/queries.ts";
import {useItemRemove, useItemUpdate} from "../api/mutations.ts";
import {Loading} from "../../../shared/components/Loading.tsx";

export function TaskItemEditorPage() {
  const {id} = useParams();

  const {isLoading, data: item} = useItemDetail(id ?? '')
  const {mutate: update} = useItemUpdate()
  const {mutate: remove} = useItemRemove()

  function handleSubmit(editedItem: TaskItemData) {
    update(editedItem)
  }

  function handleDelete() {
    remove(id!)
  }

  if (isLoading) return <Loading />

  return (
    <main>
      <article className="flex gap-10 items-center">
        <h1 className="text-4xl font-medium text-indigo-700">Editar tarefa</h1>
        <Button onClick={handleDelete} variant={"surface"} color="ruby">Excluir <TrashIcon/></Button>
      </article>
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