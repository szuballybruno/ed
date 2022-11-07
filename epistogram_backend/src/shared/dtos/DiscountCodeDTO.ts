import { Id } from '../types/versionId';

export class DiscountCodeDTO {
    id: Id<'DiscountCode'>;
    code: string;
    isUsed: boolean;
}