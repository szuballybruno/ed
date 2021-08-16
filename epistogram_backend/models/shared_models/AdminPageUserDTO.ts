import { UserTaskDTO } from "./UserTaskDTO";

export type AdminPageUserView = {
    _id: string;
    active: boolean;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    organizationName: string;
    innerRole: string;
    name: string;
    tasks: UserTaskDTO[];
}
