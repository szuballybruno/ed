import { TaskObjectiveType } from "./types/sharedTypes";

export type TaskDTO = {
    objective: TaskObjectiveType,
    text: string;
    dueDate: string;
    addedDate: number;
    name: string;
    addedBy: string;
    due: string;
    status: string;
}