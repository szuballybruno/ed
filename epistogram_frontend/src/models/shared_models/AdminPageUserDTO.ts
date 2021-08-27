import { TaskDTO } from "./TaskDTO";
import { UserDTO } from "./UserDTO";

export type AdminPageUserDTO = UserDTO & {
    organizationName: string;
    tasks: TaskDTO[];
}