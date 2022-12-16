import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ShopItemCategory {

    @XViewColumn()
    id: Id<'ShopItemCategory'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    shopItemsId: Id<'ShopItems'> | null;
}