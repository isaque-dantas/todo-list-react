import {type Dispatch} from "react";

export interface TasksWithDate {
    date: Date;
    groups: TaskGroupWithItems[];
}

export interface TaskGroupWithItems {
    id: string;
    name: string;
    items: NestedTaskItemData[];
    userId: string;
}

export interface TaskGroupWithoutItems {
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

export interface CacheContextData {
    users: User[] | null,
    items: TaskItemData[] | null,
    groups: TaskGroupWithoutItems[] | null
}

export type CacheEntity = 'items' | 'groups' | 'users';

export interface CacheDispatcherAction {
    type: 'onGet' | 'add' | 'update' | 'remove';
    data: NonNullable<CacheContextData[CacheEntity]>,
    entityName: CacheEntity;
    id: string | null
}

export type CacheDispatcher = Dispatch<CacheDispatcherAction> | null;