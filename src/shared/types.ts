export interface TaskGroupWithItems {
    id: string;
    name: string;
    items: TaskItemData[];
    userId: string;
}

export interface TaskGroupWithoutItems {
    id: string;
    name: string;
    userId: string;
}

export interface TaskItemData {
    id: string;
    content: string;
    isDone: boolean;
    groupId: string;
    userId: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string | number;
}
