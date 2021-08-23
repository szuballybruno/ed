import { TaskObjectiveType } from "./types/sharedTypes";

export type TaskDTO = {
    objective: TaskObjectiveType,
    text: string;
    dueDate: string;
}