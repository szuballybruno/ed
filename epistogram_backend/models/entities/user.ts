
import { IdType } from "../shared_models/types/sharedTypes";

export type User = {
    _id: IdType;
    userData: {
        organizationId: IdType;
        refreshToken: string;
        password: string;
    }
}