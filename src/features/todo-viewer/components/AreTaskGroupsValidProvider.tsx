import {AreTaskGroupsValidContext, AreTaskGroupsValidDispatchContext} from "./tasksContext.ts";
import {type ReactNode, useReducer} from "react";
import type {AreTaskGroupsValidAction, BooleanArray, TasksWithDate} from "../types.ts";

function areTaskGroupsValidReducer(prevState: BooleanArray, action: AreTaskGroupsValidAction, quantityOfTaskGroups: number): BooleanArray {
  while (prevState.length < quantityOfTaskGroups) prevState.push(null)
  return prevState.with(action.index, action.isValid);
}

export function AreTaskGroupsValidProvider({children, quantityOfTaskGroups}: {children: ReactNode, quantityOfTaskGroups: number}) {
  const [areTaskGroupsValid, dispatch] = useReducer(
    (prevState: BooleanArray, action: AreTaskGroupsValidAction): BooleanArray => areTaskGroupsValidReducer(prevState, action, quantityOfTaskGroups),
    []
  );

  return (
    <AreTaskGroupsValidContext value={areTaskGroupsValid}>
      <AreTaskGroupsValidDispatchContext value={dispatch}>
        {children}
      </AreTaskGroupsValidDispatchContext>
    </AreTaskGroupsValidContext>
  )
}