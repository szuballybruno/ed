import { CurrentTasksDTO } from "./models/shared_models/CurrentTasksDTO";

export const mockTasks = {
    tasks: [
        {
            objective: "video",
            name: "Elme karbantartása",
            createdBy: "Spengler Manfréd",
            status: "assigned",
            creationDate: new Date(2021, 8, 27),
            dueDate: new Date(2021, 10, 15),
            priority: "normal"
        },
        {
            objective: "playlist",
            name: "Gravitációs normák kisimítása",
            createdBy: "Spengler Manfréd",
            status: "inProgress",
            creationDate: new Date(2021, 9, 1),
            dueDate: new Date(2021, 10, 24),
            priority: "important"
        },
        {
            objective: "course",
            name: "Összefoglaló írása az office kurzusból",
            createdBy: "Spengler Manfréd",
            status: "submitted",
            creationDate: new Date(2021, 9, 10),
            dueDate: new Date(2021, 10, 30),
            priority: "urgent"
        },
        {
            objective: "exam",
            name: "Új barátok szerzése",
            createdBy: "Spengler Manfréd",
            status: "rejected",
            creationDate: new Date(2021, 9, 2),
            dueDate: new Date(2021, 11, 3),
            priority: "normal"
        },
        {
            objective: "video",
            name: "Epistogram kihasználása, maximális szinten",
            createdBy: "Spengler Manfréd",
            status: "completed",
            creationDate: new Date(2021, 9, 6),
            dueDate: new Date(2021, 11, 7),
            priority: "normal"
        }
    ]
} as CurrentTasksDTO;
