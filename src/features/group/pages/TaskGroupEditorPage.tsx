import {TaskGroupForm} from "../components/TaskGroupForm.tsx";
import type {TaskGroupWithoutItems} from "../../../shared/types.ts";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {Button, Spinner} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {useGroupRemove, useGroupUpdate} from "../api/mutations.ts";
import {useGroupDetail} from "../api/queries.ts";
import { Loading } from "../../../shared/components/Loading.tsx";

export function TaskGroupEditorPage() {
  const {id} = useParams()

  const {isLoading, data: group} = useGroupDetail(id ?? '')
  const update = useGroupUpdate()
  const remove = useGroupRemove()

  const navigate = useNavigate()
  const [searchParams, _] = useSearchParams()

  function handleSubmit(editedGroup: TaskGroupWithoutItems) {
    update.mutate(editedGroup)
  }

  function handleDelete() {
    remove.mutate(id!)
    navigate(searchParams.get('to') ?? '/')
  }

  if (isLoading || group === undefined) return <Loading/>

  return (
    <main>
      <article className="flex gap-10 items-center">
        <h1 className="text-4xl font-medium text-indigo-700">Editar grupo</h1>
        <Button onClick={handleDelete} variant={"surface"} color="ruby">Excluir <TrashIcon/></Button>
      </article>
      {
        group === null
          ?
          <p>Carregando... <Spinner/></p>
          :
          <TaskGroupForm defaultValues={group} onSubmit={handleSubmit}/>
      }
    </main>
  )
}