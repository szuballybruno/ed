
export class UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    organizationId: number;
    role: string;
    jobTitle: string;
    isActive: boolean;
    email: string;
    phoneNumber: string;
    name: string;
    avatarUrl: string | null;

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
        name: string,
        avatarUrl: string | null) {

        this.role = role;
        this.id = userId;
        this.organizationId = organizationId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.isActive = isActive;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }
}