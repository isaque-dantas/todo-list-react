import {getTaskGroupSchema, taskGroupFactory, tasksFactory} from "../domain/tasks.ts";
import {Strong} from "@radix-ui/themes";
import {DateSelector} from "../components/DateSelector.tsx";
import {TaskGroupList} from "../components/TaskGroupList.tsx";
import {AddTaskGroupButton} from "../components/AddTaskGroupButton.tsx";
import type {TaskGroupData, TasksWithDate} from "../types.ts";
import {TaskGroupBeingEditedProvider} from "../components/TaskGroupBeingEditedProvider.tsx";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect} from "react";
import {flushSync} from "react-dom";

function validateGroups(data: TaskGroupData[], ctx: z.RefinementCtx) {
  data.forEach((group, groupIndex) => {
    group.items.forEach((itemToValidate, itemIndex) => {
      if (group.items.some((item, index) => itemIndex !== index && itemToValidate.content === item.content)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Essa tarefa já foi adicionada!',
          path: [groupIndex, 'items', itemIndex, 'content'],
        })
      }
    })

    if (data.some(
      (g, i: number) => groupIndex !== i && group.name === g.name
    )) {
      ctx.addIssue({
        code: 'custom',
        message: 'O nome desse grupo já está sendo utilizado!',
        path: [groupIndex, 'name']
      })
    }
  })
}

export function TaskViewerPage() {
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

  // useEffect(() => {
  //   methods.subscribe({
  //     formState: {errors: true},
  //     callback: ({errors}) => console.log('erros do form: ', errors)}
  //   )
  // }, []);

  function addTaskGroup() {
    const updatedGroups = [...methods.getValues('groups'), taskGroupFactory()]
    flushSync(() => methods.setValue("groups", updatedGroups))

    const newGroupIndex = updatedGroups.length - 1
    methods.setFocus(`groups.${newGroupIndex}.name`)
    methods.trigger(`groups.${newGroupIndex}.name`)
  }

  return (
    <main className={"max-w-2xl mx-auto py-16"}>
      <DateSelector/>

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