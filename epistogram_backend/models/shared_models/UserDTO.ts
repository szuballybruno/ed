import { IdType } from "./types/sharedTypes";

export class UserDTO {
    userId: IdType;
    firstName: string;
    lastName: string;
    organizationId: IdType;

    constructor(
        userId: IdType,
        organizationId: IdType,
        firstName: string,
        lastName: string) {

        this.userId = userId;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}