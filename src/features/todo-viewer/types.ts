import {z} from "zod";
import {type Dispatch} from "react";
import type {
    Control,
    FieldErrors,
    UseFormGetValues, UseFormRegister,
    UseFormSetFocus,
    UseFormSetValue,
    UseFormSubscribe, UseFormTrigger,
    UseFormWatch
} from "react-hook-form";

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

export interface FormProps {
    register: UseFormRegister<TasksWithDate>;
    setFocus: UseFormSetFocus<TasksWithDate>;
    subscribe: UseFormSubscribe<TasksWithDate>;
    getValues: UseFormGetValues<TasksWithDate>;
    errors: FieldErrors<TasksWithDate>;
    setValue: UseFormSetValue<TasksWithDate>;
    watch: UseFormWatch<TasksWithDate>;
    control: Control<TasksWithDate>;
    trigger: UseFormTrigger<TasksWithDate>;
}

export interface TaskGroupBeingEditedChanged {
    source: 'add-btn' | 'edit-btn';
    index: number | null;
    finishedEditing: boolean | null;
}
export type TaskGroupBeingEdited = number | null;
export type TaskGroupBeingEditedDispatch = Dispatch<TaskGroupBeingEdited> | null

export type BooleanArray = (boolean | null)[]
export interface AreTaskGroupsValidAction { index: number, isValid: boolean}
export type TaskGroupValidationDispatch = Dispatch<AreTaskGroupsValidAction> | null

export const TaskItemSchema = z.object({
    content: z.string(),
    isDone: z.boolean(),
})

export const TaskGroupSchema = z.object({
    name: z.string(),
    items: z.array(TaskItemSchema)
})
