import type {TaskGroupData, TaskItemData, TasksWithDate} from "../types.ts";
import {z} from "zod";

export function tasksFactory(): TasksWithDate {
  return {
    date: new Date(),
    groups: [
      {
        name: 'Demandas da faculdade', items: [
          {content: 'Fazer exercícios de Cálculo da seção 2.1', isDone: false},
          {content: 'OA sobre equação do primeiro grau', isDone: true},
          {content: 'Comprar 3kg de banana', isDone: true},
          {content: 'Comprar 8kg de filé de peito de frango', isDone: false},
        ]
      },
    ]
  }
}

export function getToday(date: Date): string {
  return date.toLocaleDateString('pt-br')
}

export function taskGroupFactory(): TaskGroupData {
  return {
    name: '',
    items: []
  }
}

export function taskItemFactory(): TaskItemData {
  return {
    content: '',
    isDone: false
  }
}

export function getTaskGroupSchema() {
  const groupName = (
    z
      .string()
      .trim()
      .nonempty({message: "Insira um nome para o grupo de tarefas."})
    // .refine(
    //   s => !otherTaskGroupNames.includes(s),
    //   {message: "Esse nome já está sendo usado em outro grupo!"}
    // )
  )

  const taskItemContent = (
    z.string()
      .trim()
      .nonempty("Insira uma tarefa!")
    // .refine(
    //   s => taskItems.filter(t => t.content == s).length == 1,
    //   {message: "Você já colocou essa tarefa."}
    // )
  )

  return z.object({
    name: groupName,
    items: z.array(
      z.object({
        content: taskItemContent,
        isDone: z.boolean()
      }).required()
    )

  })
    .required();
}