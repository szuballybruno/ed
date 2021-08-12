
import { IdType } from "../shared_models/types/sharedTypes";

export type User = {
    userId: IdType;
    userData: {
        organizationId: IdType;
        refreshToken: string;
        password: string;
    }
}