import {type Dispatch} from "react";

export interface TasksWithDate {
    date: Date;
    groups: TaskGroupData[];
}

export interface TaskGroupData {
    id: string;
    name: string;
    items: NestedTaskItemData[];
    userId: string;
}

export interface TaskGroupToSend {
    id: string;
    name: string;
    userId: string;
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
    userId: string;
}

export interface TaskItemToSend {
    id?: string;
    content: string;
    isDone: boolean;
    groupId: string;
    userId: string;
}

export type TaskGroupBeingEdited = number | null;
export type TaskGroupBeingEditedDispatch = Dispatch<TaskGroupBeingEdited> | null

export type BooleanArray = (boolean | null)[]

export interface LoginForm {
    email: string;
    password: string;
}

export interface UserToSend extends LoginForm {
    name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}