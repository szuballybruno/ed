import { Id } from '@episto/commontypes';

export class DiscountCodeDTO {
    id: Id<'DiscountCode'>;
    code: string;
    isUsed: boolean;
}