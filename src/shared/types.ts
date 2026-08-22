import {type Dispatch} from "react";

export interface TasksWithDate {
    date: Date;
    groups: TaskGroupData[];
}

export interface TaskGroupData {
    id: string;
    name: string;
    items: NestedTaskItemData[];
}

export interface TaskGroupToSend {
    id: string;
    name: string;
}

export interface NestedTaskItemData {
    id: string;
    content: string;
    isDone: boolean;
}

export interface TaskItemData {
    id: string;
    content: string;
    isDone: boolean;
    groupId: string;
}

export interface TaskItemToSend {
    id?: string;
    content: string;
    isDone: boolean;
    groupId: string;
}

export type TaskGroupBeingEdited = number | null;
export type TaskGroupBeingEditedDispatch = Dispatch<TaskGroupBeingEdited> | null

export type BooleanArray = (boolean | null)[]