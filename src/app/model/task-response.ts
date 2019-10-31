import { Task } from './task';

export interface TaskResponse {
    success: boolean,
    statusCode: number,
    message: string,
    task: Task
}

export interface TasksResponse {
    success: boolean,
    statusCode: number,
    message: string,
    tasks: Task[]
}