import { TaskObjectiveType } from "./types/sharedTypes";

export type TaskDTO = {
    name: string;
    objective: TaskObjectiveType,
    dueDate: Date;
    creationDate: Date;
    createdBy: string;
    status: string;
}