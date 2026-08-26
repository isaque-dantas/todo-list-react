import {Switch} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {Link} from "@radix-ui/themes";
import {useState} from "react";
import {TaskGroupComponent} from "../components/TaskGroupComponent.tsx";
import {useGroupList} from "../../group/api/queries.ts";
import {Loading} from "../../../shared/components/Loading.tsx";
import type {TaskGroupWithItems} from "../../../shared/types.ts";

export function DashboardPage() {
  const { isPending, isError, data, error } = useGroupList({ shouldEmbedItems: true })
  const [checked, setChecked] = useState<boolean>(false)
  const navigate = useNavigate();

  if (isPending || data === undefined) return <Loading/>;
  if (isError) return <p>Houve um error! {error.message}</p>

  let content = null;
  if (data.length === 0) {
    content = <p className="text-indigo-700 text-xl italic">Ainda não há grupos de tarefas cadastrados.</p>
  } else {
    content = (
      <section className="flex flex-col gap-16">
        {
          data.map(
            group => <TaskGroupComponent
              key={group.id}
              group={group as TaskGroupWithItems}
              shouldShowEditBtn={checked}
            />
          )
        }
      </section>
    )
  }

  return (
    <main>
      <article className="flex flex-col md:flex-row gap-6 md:gap-16 md:items-center mb-10">
        <h1 className="text-4xl text-indigo-700 font-medium">Tarefas disponíveis</h1>
        <div className="flex items-center gap-2">
          <p className="cursor-pointer" onClick={() => setChecked(!checked)}>Mostrar botões de edição</p>
          <Switch checked={checked} onCheckedChange={setChecked} ></Switch>
        </div>
        <p>Clique aqui para <Link onClick={() => navigate('/tarefas/adicionar')}>adicionar uma tarefa</Link>.</p>
      </article>

      { content }
    </main>
  )
}