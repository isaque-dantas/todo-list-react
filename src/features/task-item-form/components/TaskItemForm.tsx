import {Controller, type FieldErrors, useForm} from "react-hook-form";
import type {TaskItemToSend} from "../../../shared/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {taskItemFactory} from "../../../shared/domain.ts";
import {z} from "zod";
import {useGroups, useItems} from "../../task-viewer/services/tasks.ts";
import {Button, Checkbox, Spinner} from "@radix-ui/themes";
import {type SubmitEvent, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";

interface Props {
  onSubmit: (data: TaskItemToSend) => unknown;
  defaultValues?: TaskItemToSend;
}

export function TaskItemForm({onSubmit, defaultValues}: Props) {
  const groups = useGroups();
  const itemsFromApi = useItems();
  const [addedItems, setAddedItems] = useState<TaskItemToSend[]>([]);
  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate();

  const schema = z.object({
    content: z.string().nonempty("O conteúdo da tarefa não pode estar vazio.").trim(),
    isDone: z.boolean(),
    groupId: z.string().nonempty("Você precisa escolher um grupo."),
    userId: z.any(),
  })
    .required()
    .superRefine((data, ctx) => {
      const itemsToCompare = itemsFromApi ? addedItems.concat(itemsFromApi) : addedItems
      let itemsFromSameGroup = itemsToCompare.filter(item => item.groupId === data.groupId)
      if (itemsFromSameGroup === undefined) return;

      if (defaultValues) itemsFromSameGroup = itemsFromSameGroup.filter(item => item.id !== defaultValues.id);
      if (itemsFromSameGroup.some(item => item.content === data.content)) {
        ctx.addIssue({
          code: 'custom',
          path: ['content'],
          message: 'Essa tarefa já foi cadastrada!'
        })
      }
    });

  const defaultValuesOnForm = defaultValues ?? taskItemFactory();

  const {register, reset, getValues, control, formState: {errors}, handleSubmit} = useForm<TaskItemToSend>({
    resolver: zodResolver(schema),
    defaultValues: {...defaultValuesOnForm},
    mode: 'onBlur'
  })

  async function handleClick(e: SubmitEvent) {
    e.preventDefault();

    await handleSubmit(
      (item: TaskItemToSend) => {
        if (defaultValues) {
          navigate(searchParams.get('to') ?? '/')
        }
        reset()
        setAddedItems([...addedItems, item])
        onSubmit(item)
      },
      onError
    )()
  }

  function onError(errors: FieldErrors<TaskItemToSend>) {
    console.log('erro!!!', errors)
  }

  const contentError = errors?.content;
  const contentErrorMessage = contentError ? <p className="font-medium text-sm text-red-700">{contentError.message}</p> : null;

  const groupIdError = errors?.groupId;
  const groupIdErrorMessage = groupIdError ? <p className="font-medium text-sm text-red-700">{groupIdError.message}</p> : null;

  return (
    <form onSubmit={handleClick}>
      <article className="mt-8 flex flex-col gap-6 items-start mb-10">
        <fieldset className="flex flex-3 flex-col gap-2 w-full max-w-120">
          <label htmlFor="content">Conteúdo da tarefa</label>
          <input
            id="content"
            {...register("content")}
            placeholder="Insira o conteúdo da tarefa aqui..."
            className="flex-1 border px-2 py-1 rounded-lg border-slate-300"
          />
          {contentErrorMessage}
        </fieldset>

        {
          groups === null ?
            <p className="flex gap-2">Carregando... <Spinner/></p> :

            <fieldset className="flex flex-1 flex-col gap-2 w-full max-w-80">
              <label htmlFor="groupId">Grupo de tarefas</label>
              <select
                id="groupId"
                {...register("groupId")}
                defaultValue={groups.at(0)?.id}
                className="flex-1 border px-2 py-1 rounded-lg border-slate-300"
              >
                {groups.map((g, index) => <option key={index} value={g.id}>{g.name}</option>)}
              </select>
              {groupIdErrorMessage}
            </fieldset>
        }

        <fieldset className="flex flex-1  gap-2 max-w-40">
          <Controller
            name="isDone"
            control={control}
            defaultValue={getValues("isDone")}
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <Checkbox
                id="isDone"
                size="3"
                checked={value}
                onCheckedChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
          <label htmlFor="isDone">Foi concluída?</label>
        </fieldset>
      </article>

      <div className="w-fit">
        <Button
          disabled={errors !== undefined && errors.content !== undefined }
          type="submit"
          size="2">
          Enviar informações
        </Button>
      </div>
    </form>
  )
}