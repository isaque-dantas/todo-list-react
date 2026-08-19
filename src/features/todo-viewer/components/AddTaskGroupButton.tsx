import {Button} from "@radix-ui/themes";
import {useTaskGroupBeingEditedDispatch} from "../domain/tasksContext.ts";
import {type FieldErrors, useFormContext} from "react-hook-form";
import type {TaskGroupData, TasksWithDate} from "../types.ts";

interface Props {
    addedTaskGroup: () => void;
}

export function AddTaskGroupButton({addedTaskGroup}: Props) {
    const taskGroupBeingEditedDispatch = useTaskGroupBeingEditedDispatch();
    const {getValues, formState: {errors}} = useFormContext<TasksWithDate>()

    const quantityOfTaskGroups = getValues(`groups`).length

    function handleClick() {
        addedTaskGroup()
        taskGroupBeingEditedDispatch!(quantityOfTaskGroups)
    }

    function canAddGroup() {
        const groupErrors = errors?.groups as FieldErrors<TaskGroupData> | undefined
        return groupErrors === undefined
    }

    return (
      <article className="mt-16">
          <Button disabled={!canAddGroup()} onClick={handleClick}>Adicionar grupo de tarefas</Button>
      </article>
    )
}