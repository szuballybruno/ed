import { IdType } from "./types/sharedTypes";

export class UserDTO {
    userId: IdType;
    organizationId: IdType;

    constructor(userId: IdType, organizationId: IdType) {

        this.userId = userId;
        this.organizationId = organizationId;
    }
}