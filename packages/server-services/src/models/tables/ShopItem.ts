import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class ShopItem {

    @XViewColumn()
    id: Id<'ShopItem'>;

    @XViewColumn()
    name: string | null;

    @XViewColumn()
    purchaseLimit: number | null;

    @XViewColumn()
    detailsUrl: string | null;

    @XViewColumn()
    coinPrice: number;

    @XViewColumn()
    currencyPrice: number;

    @XViewColumn()
    shopItemCategoryId: Id<'ShopItemCategory'>;

    @XViewColumn()
    coverFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    courseId: Id<'Course'> | null;

    @XViewColumn()
    discountCodesId: Id<'DiscountCodes'> | null;
}