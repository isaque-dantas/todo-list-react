import {Controller, type FieldErrors, useForm} from "react-hook-form";
import type {TaskItemData} from "../../../shared/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button, Checkbox, Spinner} from "@radix-ui/themes";
import {type SubmitEvent} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {useGroupList} from "../../group/api/queries.ts";
import {useItemList} from "../api/queries.ts";
import {Loading} from "../../../shared/components/Loading.tsx";
import {taskItemFactory} from "../domain.ts";

interface Props {
  onSubmit: (data: TaskItemData) => unknown;
  defaultValues?: TaskItemData;
}

export function TaskItemForm({onSubmit, defaultValues}: Props) {
  const {isLoading: isLoadingGroups, data: groups} = useGroupList({shouldEmbedItems: false});
  const {isLoading: isLoadingItems, data: itemsFromApi} = useItemList();

  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate();

  const schema = z.object({
    id: z.string(),
    content: z.string().nonempty("O conteúdo da tarefa não pode estar vazio.").trim(),
    isDone: z.boolean(),
    groupId: z.string().nonempty("Você precisa escolher um grupo."),
    userId: z.any(),
  })
    .required()
    .superRefine((data, ctx) => {
      if (itemsFromApi === undefined) return;

      let itemsFromSameGroup = itemsFromApi.filter(item => item.groupId === data.groupId)
      if (itemsFromSameGroup.length === 0) return;

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

  const {register, reset, getValues, control, formState: {errors}, handleSubmit} = useForm<TaskItemData>({
    resolver: zodResolver(schema),
    defaultValues: {...defaultValuesOnForm},
    mode: 'onBlur'
  })

  async function handleClick(e: SubmitEvent) {
    e.preventDefault();

    await handleSubmit(
      (item: TaskItemData) => {
        if (defaultValues) {
          navigate(searchParams.get('to') ?? '/')
        }
        reset()
        onSubmit(item)
      },
      onError
    )()
  }

  function onError(errors: FieldErrors<TaskItemData>) {
    console.error(errors)
  }

  if (isLoadingItems || isLoadingGroups || itemsFromApi === undefined || groups === undefined) return <Loading/>

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