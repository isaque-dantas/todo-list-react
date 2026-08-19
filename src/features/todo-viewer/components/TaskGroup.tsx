import {type FormProps, type TaskGroupData, type TaskItemData, type TasksWithDate} from "../types.ts";
import TaskItem from "./TaskItem.tsx";
import {
  useTaskGroupBeingEdited,
  useTaskGroupBeingEditedDispatch,
} from "./tasksContext.ts";
import {useState, type FocusEvent, type KeyboardEvent, useEffect} from "react";
import {Button} from "@radix-ui/themes";
import {Pencil1Icon, PlusIcon, TrashIcon} from "@radix-ui/react-icons";
import {taskItemFactory} from "../domain/tasks.ts";
import {type FieldErrors, useFormContext} from "react-hook-form";
import {flushSync} from "react-dom";

interface Props {
  index: number;
  otherTaskGroupsNames: string[];
}

export function TaskGroup({index}: Props) {
  // const areTaskGroupsValidDispatch = useAreTaskGroupsValidDispatch()
  const {setFocus, subscribe, setValue, trigger, getValues, formState: {errors}, watch, register, } = useFormContext<TasksWithDate>();
  const dispatch = useTaskGroupBeingEditedDispatch();

  useEffect(() => {
    subscribe({
      name: `groups.${index}.name`,
      formState: {values: true},
      callback: () => trigger(`groups`).then(t => console.log(`validou group ${t}`))
    })
  }, []);

  const groupBeingEdited = useTaskGroupBeingEdited()
  const groupBeingEditedDispatch = useTaskGroupBeingEditedDispatch()

  const [taskItemBeingEdited, setTaskItemBeingEdited] = useState<number | null>(null)

  function startEditing() {
    groupBeingEditedDispatch!(index)
    setFocus(`groups.${index}.name`)
    console.log('focus on group ', index)
  }

  function onDelete() {
    const taskGroupsWithoutThisOne = (
      getValues("groups")
        .filter(
          (_, i) => i !== index
        )
    )

    setValue("groups", taskGroupsWithoutThisOne)
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") dispatch!(null)
  }

  function handleBlur(e: FocusEvent<HTMLElement>) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    dispatch!(null)
  }

  function addTaskItem() {
    flushSync(() => setValue(
      `groups.${index}.items`,
      [
        ...getValues(`groups.${index}.items`),
        taskItemFactory()
      ]
    ))

    const newItemIndex = getValues(`groups.${index}.items`).length - 1
    setTaskItemBeingEdited(newItemIndex)
    setFocus(`groups.${index}.items.${newItemIndex}.content`)
    trigger(`groups.${index}.items.${newItemIndex}.content`)
  }

  function canAddTaskItem(): boolean {
    const taskItemErrors = (errors?.groups?.at!(index) as FieldErrors<TaskGroupData> | undefined)?.items as FieldErrors<TaskItemData[]> | undefined
    return taskItemErrors === undefined || taskItemErrors.every(error => error === undefined)
  }

  const nameError = errors?.groups?.at!(index)?.name;
  let userNameErrorMessage = null;
  if (nameError) {
    userNameErrorMessage = <p className="my-2 text-red-700 font-medium">{nameError.message}</p>
  }

  const groupItems = watch(`groups.${index}.items`);

  return (
    <article className={"flex flex-col gap-2"}>
      <fieldset
        className={"flex flex-col gap-1" + (groupBeingEdited === index || nameError ? "" : " hidden")}
        onBlur={handleBlur}
      >
        <div className={"flex gap-2 items-center"}>
          <input
            {...register(`groups.${index}.name`)}
            className="border-slate-300 border rounded-lg px-2 py-1 text-2xl flex-1"
            onKeyDown={handleKeyDown}
            onClick={startEditing}
          />
          <article className="max-w-40 cursor-pointer">
            <Button onClick={onDelete} color="ruby" variant={"surface"}>Excluir<TrashIcon/></Button>
          </article>
        </div>
        { userNameErrorMessage }
      </fieldset>

      <article
        className={"flex items-center gap-4 group cursor-pointer" + (groupBeingEdited === index || nameError ? " hidden" : "")}
        onClick={startEditing}
      >
        <h3 className={"text-2xl italic font-medium"}>{getValues(`groups.${index}.name`)}</h3>
        <div className="group-hover:scale-110 group-hover:text-slate-700 text-slate-300 transition-all flex gap-1 items-center">
          <span className={"font-sm font-medium"}>Editar</span>
          <Pencil1Icon className="group-hover:rotate-none rotate-90 transition-all"/>
        </div>
      </article>

      <div className={"w-full border-b border-slate-200 mb-4"}></div>
      <ul className={"flex flex-col gap-4"}>
        {
          groupItems.map(
            (_, i) =>
              <TaskItem
                key={i}
                onStartEditing={() => setTaskItemBeingEdited(i)}
                otherItems={
                  groupItems
                    .filter(
                      (_, index) => index !== i
                    )
                }

                groupIndex={index}
                index={i}

                isBeingEdited={taskItemBeingEdited === i}
                onBlur={() => setTaskItemBeingEdited(null)}
              />
          )
        }
      </ul>
      <div className="max-w-40 mt-4 flex items-center gap-2">
        <Button disabled={!canAddTaskItem()} variant={"outline"} onClick={addTaskItem}>
          Adicionar tarefa
          <PlusIcon></PlusIcon>
        </Button>
      </div>
    </article>
  )
}