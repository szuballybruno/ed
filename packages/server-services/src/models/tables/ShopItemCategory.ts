import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ShopItemCategory {

    @XViewColumn()
    id: Id<'ShopItemCategory'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    shopItemsId: Id<'ShopItems'> | null;
}