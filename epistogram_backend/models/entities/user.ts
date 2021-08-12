import { IdType } from "../../utilities/helpers";

export class User {
    userId: IdType;
    organizationId: number;
    activeRefreshToken: string;

    constructor(userId: string, organizationId: number, activeRefreshToken: string) {

        this.userId = userId;
        this.organizationId = organizationId;
        this.activeRefreshToken = activeRefreshToken;
    }
}