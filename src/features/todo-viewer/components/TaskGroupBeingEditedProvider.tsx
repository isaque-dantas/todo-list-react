import {TaskGroupEditingContext, TaskGroupEditingDispatchContext, useAreTaskGroupsValid} from "./tasksContext.ts";
import {type ReactNode, useReducer} from "react";
import type {BooleanArray, TaskGroupBeingEdited} from "../types.ts";

interface Props {
    children: ReactNode;
}

function taskGroupBeingEditedReducer(prevState: TaskGroupBeingEdited, newState: TaskGroupBeingEdited, areTaskGroupsValid: BooleanArray): TaskGroupBeingEdited {
  console.log(areTaskGroupsValid)
  if (areTaskGroupsValid.some(isValid => isValid === false)) return prevState;
  return newState;
}

export function TaskGroupBeingEditedProvider({children}: Props) {
  const areTaskGroupsValid = useAreTaskGroupsValid()
  const [taskGroupBeingEdited, dispatchTaskGroupBeingEdited] = useReducer(
    (prevState, newState): TaskGroupBeingEdited => taskGroupBeingEditedReducer(prevState, newState, areTaskGroupsValid),
    null
  )

  return (
    <TaskGroupEditingContext value={taskGroupBeingEdited}>
      <TaskGroupEditingDispatchContext value={dispatchTaskGroupBeingEdited}>
        {children}
      </TaskGroupEditingDispatchContext>
    </TaskGroupEditingContext>
  )
}