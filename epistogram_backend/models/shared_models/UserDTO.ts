import { IdType } from "./types/sharedTypes";

export class UserDTO {
    userId: IdType;
    firstName: string;
    lastName: string;
    organizationId: IdType;
    role: string;

    constructor(
        userId: IdType,
        organizationId: IdType,
        firstName: string,
        lastName: string,
        role: string) {

        this.role = role;
        this.userId = userId;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}