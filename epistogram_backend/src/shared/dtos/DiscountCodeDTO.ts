import { DiscountCode } from "../../models/entity/DiscountCode";
import { Id } from "../types/versionId";

export class DiscountCodeDTO {
    id: Id<'DiscountCode'>;
    code: string;
    isUsed: boolean;
}