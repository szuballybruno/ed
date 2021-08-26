import { IdType } from "./types/sharedTypes";

export class UserDTO {
    userId: number;
    firstName: string;
    lastName: string;
    organizationId: number;
    role: string;
    jobTitle: string;

    constructor(
        userId: number,
        organizationId: number,
        firstName: string,
        lastName: string,
        role: string,
        jobTitle: string) {

        this.role = role;
        this.userId = userId;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
    }
}