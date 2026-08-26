import type {TaskItemData} from "../../../shared/types.ts";
import {Badge, Button} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {Pencil1Icon} from "@radix-ui/react-icons";

interface Props {
  item: TaskItemData;
  shouldShowEditBtn: boolean;
}

export function TaskItemComponent({item, shouldShowEditBtn}: Props) {
  const navigate = useNavigate();

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
        shouldShowEditBtn &&
          <Button
              onClick={() => navigate(`/tarefas/${item.id}/editar?to=/`)}
              size="1"
              variant={"ghost"}>Editar <Pencil1Icon/>
          </Button>
      }
    </li>
  )
}