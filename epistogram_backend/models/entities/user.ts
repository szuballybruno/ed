import { IdType } from "../../utilities/helpers";

// export class User {
//     userId: IdType;
//     organizationId: number;
//     activeRefreshToken: string;

//     userData: {

//     }
//     (
//         userFromDB._id,
//         userFromDB.userData.organizationId,
//         userFromDB.userData.refreshToken);

//     constructor(userId: string, organizationId: number, activeRefreshToken: string) {

//         this.userId = userId;
//         this.organizationId = organizationId;
//         this.activeRefreshToken = activeRefreshToken;
//     }
// }

export type User = {
    userId: IdType;
    userData: {
        organizationId: number;
        refreshToken: string;
        password: string;
    }
}