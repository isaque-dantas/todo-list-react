import type {TaskGroupData, TasksWithDate} from "../types.ts";
import {TaskGroup} from "./TaskGroup.tsx";
import {useFormContext} from "react-hook-form";

// interface Props extends FormProps { }

export function TaskGroupList() {
  const {watch} = useFormContext<TasksWithDate>();
  const groups = watch('groups')

  return (
    <section className="flex flex-col gap-10">
      {
        groups.length > 0 ?

          groups
            .map((_, i: number) =>
              <TaskGroup
                key={i}
                index={i}
                otherTaskGroupsNames={
                  groups
                    .filter((_, index: number) => index !== i)
                    .map((t: TaskGroupData) => t.name)
                }
              />
            )
          :
          <p className="italic font-medium text-xl">Não há grupos de tarefas</p>
      }
    </section>
  )
}