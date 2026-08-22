import {useGroups} from "../services/tasks.ts";
import {Badge, Button, Spinner, Switch} from "@radix-ui/themes";
import type {NestedTaskItemData} from "../../../shared/types.ts";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {useState} from "react";
import {useNavigate} from "react-router";

export function TaskViewerPage() {
  const groups = useGroups('?_embed=items')
  const [checked, setChecked] = useState<boolean>(false)

  const navigate = useNavigate();

  function renderItem(item: NestedTaskItemData) {
    return (
      <li
        key={item.id}
        className="text-lg font-medium flex gap-4 items-center "
      >
        <p className={"w-full text-ellipsis px-1 rounded-sm" + (item.isDone ? ' bg-green-50' : ' bg-orange-50')}>{item.content}</p>
        {
          item.isDone ?
            <Badge color="green" size="2">Já foi feita</Badge>
            :
            <Badge color="orange" size="2">Falta fazer</Badge>
        }
        {
          checked &&
           <Button
             onClick={() => navigate(`/tarefas/${item.id}/editar?to=/`)}
             size="1"
             variant={"ghost"}>Editar <Pencil1Icon/>
           </Button>
        }
      </li>
    )
  }

  return (
    <main>
      <article className="flex gap-16 items-center mb-10">
        <h1 className="text-4xl text-indigo-700 font-medium">Tarefas disponíveis</h1>

        <div className="flex items-center gap-2">
          <p className="cursor-pointer" onClick={() => setChecked(!checked)}>Mostrar botões de edição</p>
          <Switch checked={checked} onCheckedChange={setChecked} ></Switch>
        </div>
      </article>

      {
        groups === null ? <h3>Carregando... <Spinner /></h3> :
          <section className="flex flex-col gap-16">
            {
              groups.map(group => (
                <article key={group.id}>
                  <div className="flex gap-10 items-center mb-6">
                    <h3 className="text-2xl font-bold">{group.name}</h3>
                    {
                      checked &&
                        <Button
                            onClick={() => navigate(`/grupos/${group.id}/editar?to=/`)}
                            size="1"
                            variant={"ghost"}>Editar <Pencil1Icon/>
                        </Button>
                    }
                  </div>
                  <ul className="grid grid-cols-3 gap-y-4 gap-x-10">{ group.items.map(renderItem) }</ul>
                </article>
              ))
            }
          </section>
      }
    </main>
  )
}