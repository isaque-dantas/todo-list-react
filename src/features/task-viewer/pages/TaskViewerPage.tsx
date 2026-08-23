import {useGroups} from "../services/tasks.ts";
import {Spinner, Switch} from "@radix-ui/themes";
import {useState} from "react";
import {TaskGroupComponent} from "../components/TaskGroupComponent.tsx";

export function TaskViewerPage() {
  const groups = useGroups('?_embed=items')
  const [checked, setChecked] = useState<boolean>(false)

  let groupsContent = null;

  if (groups === null) {
    groupsContent = <h3>Carregando... <Spinner /></h3>;
  } else if (groups.length === 0) {
    groupsContent = <p className="text-indigo-700 text-xl italic">Ainda não há grupos de tarefas cadastrados.</p>
  } else groupsContent = (
      <section className="flex flex-col gap-16">
        { groups.map(group => <TaskGroupComponent group={group} shouldShowEditBtn={checked}/>) }
      </section>
    )

  return (
    <main>
      <article className="flex gap-16 items-center mb-10">
        <h1 className="text-4xl text-indigo-700 font-medium">Tarefas disponíveis</h1>

        <div className="flex items-center gap-2">
          <p className="cursor-pointer" onClick={() => setChecked(!checked)}>Mostrar botões de edição</p>
          <Switch checked={checked} onCheckedChange={setChecked} ></Switch>
        </div>
      </article>

      { groupsContent}
   </main>
  )
}