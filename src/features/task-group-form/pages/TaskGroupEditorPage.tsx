import {TaskGroupForm} from "../components/TaskGroupForm.tsx";
import {put, remove, } from "../../../shared/services/api-service.ts";
import {useGet} from "../../../shared/hooks.ts";
import type {TaskGroupWithoutItems} from "../../../shared/types.ts";
import {useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {Button, Spinner} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {useCacheDispatcher} from "../../../shared/contexts/cache-context.ts";
// import {getGroupToSendFromGroup} from "../../../shared/domain.ts";

export function TaskGroupEditorPage() {
  const {id} = useParams()
  const [group, setGroup] = useState<TaskGroupWithoutItems>();
  useGet(`groups/${id}`, setGroup)

  const dispatch = useCacheDispatcher()

  const navigate = useNavigate()
  const [searchParams, _] = useSearchParams()

  function handleSubmit(editedGroup: TaskGroupWithoutItems) {
    put(`groups/${id}`, editedGroup)
    dispatch!({
      type: 'update',
      entityName: 'groups',
      id: id!,
      data: [editedGroup]
    })
  }

  function handleDelete() {
    remove(`groups/${id}`)
    navigate(searchParams.get('to') ?? '/')
  }

  return (
    <main>
      <article className="flex gap-10 items-center">
        <h1 className="text-4xl font-medium text-indigo-700">Editar grupo</h1>
        <Button onClick={handleDelete} variant={"surface"} color="ruby">Excluir <TrashIcon/></Button>
      </article>
      {
        !group ? <p>Carregando... <Spinner/></p>
          :
          <TaskGroupForm defaultValues={group} onSubmit={handleSubmit}/>
      }
    </main>
  )
}