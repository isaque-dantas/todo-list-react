import {getTaskGroupSchema, taskGroupFactory, tasksFactory, validateGroups} from "../domain/tasks.ts";
import {Strong} from "@radix-ui/themes";
import {TaskGroupList} from "../components/TaskGroupList.tsx";
import {AddTaskGroupButton} from "../components/AddTaskGroupButton.tsx";
import type {TasksWithDate} from "../../../shared/types.ts";
import {TaskGroupBeingEditedProvider} from "../components/TaskGroupBeingEditedProvider.tsx";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {flushSync} from "react-dom";


export function TaskInteractiveViewerPage() {
  const groupSchema = getTaskGroupSchema()

  const schema = z.object({
    date: z.date(),
    groups: (
      z.array(groupSchema).superRefine(validateGroups)
    )
  })

  const methods = useForm<TasksWithDate>({
    resolver: zodResolver(schema),
    defaultValues: tasksFactory(),
    mode: 'onChange'
  })

  function addTaskGroup() {
    const updatedGroups = [...methods.getValues('groups'), taskGroupFactory()]
    flushSync(() => methods.setValue("groups", updatedGroups))

    const newGroupIndex = updatedGroups.length - 1
    methods.setFocus(`groups.${newGroupIndex}.name`)
    methods.trigger(`groups.${newGroupIndex}.name`)
  }

  return (
    <main className={"max-w-2xl mx-auto"}>
      <h1 className={"text-4xl mb-10"}>
        Lista de tarefas de <Strong>{methods.getValues("date").toLocaleDateString('pt-br')}</Strong>
      </h1>
      <FormProvider {...methods}>
        <TaskGroupBeingEditedProvider>
          <TaskGroupList/>
          <AddTaskGroupButton addedTaskGroup={addTaskGroup}/>
        </TaskGroupBeingEditedProvider>
      </FormProvider>
    </main>
  )
}