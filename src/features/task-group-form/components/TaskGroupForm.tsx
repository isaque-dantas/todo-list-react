import type {TaskGroupToSend} from "../../../shared/types.ts";
import {useGroups} from "../../task-viewer/services/tasks.ts";
import {useState} from "react";
import {z} from "zod";
import {Controller, type FieldErrors, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, TextField} from "@radix-ui/themes";
import {useNavigate, useSearchParams} from "react-router";
import {taskGroupToSendFactory} from "../../../shared/domain.ts";
import {getToSend} from "../domain.ts";

interface Props {
  onSubmit: (group: TaskGroupToSend) => void;
  defaultValues?: TaskGroupToSend
}

export function TaskGroupForm({onSubmit, defaultValues}: Props) {
  const groups = useGroups()?.map(getToSend);
  const [addedGroups, _] = useState<TaskGroupToSend[]>([]);
  const [searchParams, __] = useSearchParams();
  const navigate = useNavigate();

  const schema = z.object({
    id: z.string().optional(),
    name: z.string().nonempty("O nome do grupo não pode estar vazio.").trim(),
    userId: z.any(),
  })
    .required()
    .superRefine((data, ctx) => {
      let groupsToCompare = groups ? addedGroups.concat(groups) : addedGroups
      if (defaultValues) groupsToCompare = groupsToCompare.filter(group => group.id !== defaultValues.id);
      if (groupsToCompare.some(group => group.name === data.name)) {
        ctx.addIssue({
          code: 'custom',
          path: ['name'],
          message: 'Esse grupo já foi cadastrado.'
        })
      }
    });

  const {reset, control, formState: {errors}, handleSubmit} = useForm<TaskGroupToSend>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? taskGroupToSendFactory(),
    mode: 'onBlur'
  })

  async function handleClickOnSubmitBtn() {
    await handleSubmit((group: TaskGroupToSend) => {
      if (defaultValues !== undefined) {
        navigate(searchParams.get('to') ?? '/')
      } else {
        reset()
      }
      onSubmit(group)
    }, onError)()
  }

  function onError(error: FieldErrors) {
    console.error(error)
  }

  return (
    <article className="mt-10">
      <fieldset className="flex flex-col gap-2 max-w-100 mb-8">
        <label htmlFor="name">Nome do grupo</label>
        <Controller
          name="name"
          control={control}
          render={
            ({field}) =>
              <TextField.Root
                id="name"
                {...field}
                size="3"
                placeholder="Insira aqui o nome do grupo..."
              />
          }
        />
        {errors?.name !== undefined && (<p className="font-bold text-sm text-red-700">{errors.name.message}</p>)}
      </fieldset>
      <Button
        disabled={errors !== undefined && errors.name !== undefined}
        onClick={handleClickOnSubmitBtn}
      >
        Enviar informações
      </Button>
    </article>
  )
}