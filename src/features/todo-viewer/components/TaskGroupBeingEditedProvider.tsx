import {TaskGroupEditingContext, TaskGroupEditingDispatchContext} from "../domain/tasksContext.ts";
import {type ReactNode, useReducer} from "react";
import type {TaskGroupBeingEdited} from "../types.ts";

interface Props {
    children: ReactNode;
}

function taskGroupBeingEditedReducer(_: TaskGroupBeingEdited, newState: TaskGroupBeingEdited): TaskGroupBeingEdited {
  return newState;
}

export function TaskGroupBeingEditedProvider({children}: Props) {
  const [taskGroupBeingEdited, dispatchTaskGroupBeingEdited] = useReducer(
    (prevState, newState): TaskGroupBeingEdited => taskGroupBeingEditedReducer(prevState, newState),
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