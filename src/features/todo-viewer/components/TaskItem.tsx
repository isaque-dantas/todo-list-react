import type {TaskGroupData, TaskItemData, TasksWithDate} from "../types.ts";
import {Button, Checkbox} from "@radix-ui/themes";
import {
  Controller,
  type FieldErrors, useFormContext,
} from "react-hook-form";
import {type KeyboardEvent,useMemo, useEffect} from "react";
import {TrashIcon} from "@radix-ui/react-icons";

interface Props {
  otherItems: TaskItemData[];
  onStartEditing: () => void;
  onBlur: () => void;
  isBeingEdited: boolean;
  groupIndex: number;
  index: number;
}

export default function TaskItem({onStartEditing, groupIndex, index, isBeingEdited, onBlur}: Props) {
  const {setFocus, getValues, subscribe, control, trigger, formState: {errors}, register, setValue} = useFormContext<TasksWithDate>();

  const taskId = useMemo(
    () => `groups.${groupIndex}.items.${index}` as `groups.${number}.items.${number}`,
    [groupIndex, index]
  )

  useEffect(() => {
    subscribe({
      name: `groups.${groupIndex}.items.${index}.content`,
      formState: {values: true},
      callback: () => trigger(`groups`).then(t => console.log(`validou taskItem ${t}`))
    })
  }, []);

  function handleClick() {
    onStartEditing()
    setFocus(`${taskId}.content`)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') sendBlurEvent()
  }

  function sendBlurEvent() {
    if (contentErrors) return;
    onBlur()
  }

  function onDelete() {
    const itemsId: `groups.${number}.items` = `groups.${groupIndex}.items`
    onBlur()
    setValue(
      itemsId,
      getValues(itemsId).filter((_, itemIndex) => itemIndex !== index)
    )
  }

  const contentErrors = (errors?.groups?.at!(groupIndex) as FieldErrors<TaskGroupData> | undefined)?.items?.at!(index)?.content
  let contentUserErrorMessage = null;
  if (contentErrors) {
    contentUserErrorMessage = <p className="text-base italic text-red-700 font-medium">{contentErrors.message}</p>
  }

  const shouldShowInput = isBeingEdited || contentErrors !== undefined

  return (
    <li
      onBlur={sendBlurEvent}
      className={"flex items-center" + (shouldShowInput ? " gap-3" : " gap-1")}>
      <Controller
        name={`${taskId}.isDone`}
        control={control}
        defaultValue={getValues(`${taskId}.isDone`)}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <Checkbox
            checked={value}
            onCheckedChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      <article className={"flex w-full items-center gap-4"}>
        <div className={"flex flex-12 flex-col gap-1"}>
          <input
            {...register(`${taskId}.content`)}
            onKeyDown={handleKeyDown}
            onFocus={onStartEditing}
            className={"text-lg border border-slate-300 shadow-sm rounded-lg px-2 py-1" + (shouldShowInput ? "" : " hidden")}/>

          <p
            className={"px-2 py-1 text-lg" + (shouldShowInput ? " hidden" : "") + (getValues(`${taskId}.isDone`) ? " bg-green-50 rounded-lg" : "")}
            onClick={handleClick}>
            {getValues(`${taskId}.content`)}
          </p>

          {contentUserErrorMessage}
        </div>
        <div className={"flex-1"}>
          <Button size={"1"} onClick={onDelete} variant={"surface"} color={"ruby"}>Excluir<TrashIcon/></Button>
        </div>
      </article>
    </li>
  )
}