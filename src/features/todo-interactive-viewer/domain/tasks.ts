import type {
  TaskGroupData,
  NestedTaskItemData,
  TasksWithDate,
  TaskItemToSend,
  TaskGroupToSend
} from "../../../shared/types.ts";
import {z} from "zod";

export function tasksFactory(): TasksWithDate {
  return {
    date: new Date(),
    groups: [
      {
        id: '',
        name: 'Trabalho',
        items: [
          {id: '', content: 'Finalizar relatório pendente', isDone: false},
          {id: '', content: 'Conversar equipe sobre novos fluxos', isDone: false},
        ]
      },
    ]
  }
}

export function taskGroupFactory(): TaskGroupData {
  return {
    id: '',
    name: '',
    items: []
  }
}

export function taskGroupToSendFactory(): TaskGroupToSend {
  return {
    id: '',
    name: '',
  }
}

export function nestedTaskItemFactory(): NestedTaskItemData {
  return {
    id: '',
    content: '',
    isDone: false
  }
}

export function taskItemFactory(groupId: string = ''): TaskItemToSend {
  return {
    id: '',
    content: '',
    isDone: false,
    groupId: groupId
  }
}

export function getTaskGroupSchema() {
  const groupName = (
    z
      .string()
      .trim()
      .nonempty({message: "Insira um nome para o grupo de tarefas."})
  )

  const taskItemContent = (
    z.string()
      .trim()
      .nonempty("Insira uma tarefa!")
  )

  return z.object({
    id: z.string(),
    name: groupName,
    items: z.array(
      z.object({
        id: z.string(),
        content: taskItemContent,
        isDone: z.boolean()
      }).required()
    )
  })
    .required();
}

export function validateGroups(data: TaskGroupData[], ctx: z.RefinementCtx) {
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
