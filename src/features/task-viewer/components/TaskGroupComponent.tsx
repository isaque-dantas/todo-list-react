import type {TaskGroupData} from "../../../shared/types.ts";
import {Button} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {TaskItemComponent} from "./TaskItemComponent.tsx";

interface Props {
  group: TaskGroupData
  shouldShowEditBtn: boolean;
}

export function TaskGroupComponent({group, shouldShowEditBtn}: Props) {
  const navigate = useNavigate();

  return (
    <article key={group.id}>
      <div className="flex gap-4 md:gap-8 items-center mb-6">
        <h3 className="text-2xl font-bold">{group.name}</h3>
        {
          shouldShowEditBtn &&
            <Button
                onClick={() => navigate(`/grupos/${group.id}/editar?to=/`)}
                size="1"
                variant={"ghost"}>Editar <Pencil1Icon/>
            </Button>
        }
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-10">
        {
          group.items.map(
            item => <TaskItemComponent key={item.id} item={item} shouldShowEditBtn={shouldShowEditBtn}/>
          )
        }
      </ul>
    </article>
  )
}