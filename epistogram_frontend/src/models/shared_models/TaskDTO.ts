import { TaskObjectiveType, TaskPriorityType } from "./types/sharedTypes";

export type TaskDTO = {
    name: string;
    objective: TaskObjectiveType,
    dueDate: Date;
    creationDate: Date;
    createdBy: string;
    status: string;
    priority: TaskPriorityType;
}