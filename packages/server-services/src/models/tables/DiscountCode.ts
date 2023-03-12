import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class DiscountCode {

    @XViewColumn()
    id: Id<'DiscountCode'>;

    @XViewColumn()
    code: string;

    @XViewColumn()
    userId: Id<'User'> | null;

    @XViewColumn()
    shopItemId: Id<'ShopItem'>;
}