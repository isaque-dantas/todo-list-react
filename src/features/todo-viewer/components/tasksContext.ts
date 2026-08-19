import {createContext, useContext} from "react";
import type {
    BooleanArray,
    TaskGroupBeingEdited,
    TaskGroupBeingEditedDispatch, TaskGroupValidationDispatch
} from "../types.ts";

// const tasksContect = createContext<TasksWithDate>()
// const tasksDispatcherContext = createContext<(tasks: TasksWithDate) => TaskAction>()

export const TaskGroupEditingContext = createContext<TaskGroupBeingEdited>(null)
export const TaskGroupEditingDispatchContext = createContext<TaskGroupBeingEditedDispatch>(null)

// true = there are errors
export const AreTaskGroupsValidContext = createContext<BooleanArray>([])
export const AreTaskGroupsValidDispatchContext = createContext<TaskGroupValidationDispatch>(null)

export function useTaskGroupBeingEdited(): TaskGroupBeingEdited {
    return useContext(TaskGroupEditingContext)
}

export function useTaskGroupBeingEditedDispatch(): TaskGroupBeingEditedDispatch {
    return useContext(TaskGroupEditingDispatchContext)
}

export function useAreTaskGroupsValid(): BooleanArray {
    return useContext(AreTaskGroupsValidContext)
}

export function useAreTaskGroupsValidDispatch(): TaskGroupValidationDispatch {
    return useContext(AreTaskGroupsValidDispatchContext)
}