
export class UserDTO {
    userId: number;
    firstName: string;
    lastName: string;
    organizationId: number;
    role: string;
    jobTitle: string;
    isActive: boolean;
    email: string;
    phoneNumber: string;
    name: string;

    constructor(
        userId: number,
        organizationId: number,
        firstName: string,
        lastName: string,
        role: string,
        jobTitle: string,
        isActive: boolean,
        email: string,
        phoneNumber: string,
        name: string) {

        this.role = role;
        this.userId = userId;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.isActive = isActive;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.name = name;
    }
}