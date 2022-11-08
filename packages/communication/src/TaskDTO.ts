import { TaskObjectiveType, TaskPriorityType, TaskStatusType } from "@episto/commontypes";

export type TaskDTO = {
    name: string;
    objective: TaskObjectiveType,
    dueDate: Date;
    creationDate: Date;
    createdBy: string;
    status: TaskStatusType;
    priority: TaskPriorityType;
}