import {createContext, useContext} from "react";
import type {
    TaskGroupBeingEdited,
    TaskGroupBeingEditedDispatch
} from "../../../shared/types.ts";

export const TaskGroupEditingContext = createContext<TaskGroupBeingEdited>(null)
export const TaskGroupEditingDispatchContext = createContext<TaskGroupBeingEditedDispatch>(null)

export function useTaskGroupBeingEdited(): TaskGroupBeingEdited {
    return useContext(TaskGroupEditingContext)
}

export function useTaskGroupBeingEditedDispatch(): TaskGroupBeingEditedDispatch {
    return useContext(TaskGroupEditingDispatchContext)
}
