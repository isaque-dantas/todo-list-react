import {type Dispatch} from "react";

export interface TasksWithDate {
    date: Date;
    groups: TaskGroupData[];
}

export interface TaskGroupData {
    name: string;
    items: TaskItemData[];
}

export interface TaskItemData {
    content: string;
    isDone: boolean;
}

export type TaskGroupBeingEdited = number | null;
export type TaskGroupBeingEditedDispatch = Dispatch<TaskGroupBeingEdited> | null

export type BooleanArray = (boolean | null)[]