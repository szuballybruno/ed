import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ShopItemStatefulView {

    @XViewColumn()
    shopItemId: Id<'ShopItem'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    purchaseCount: number;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    purchaseLimit: number;

    @XViewColumn()
    coinPrice: number;

    @XViewColumn()
    currencyPrice: number;

    @XViewColumn()
    shopItemCategoryId: Id<'ShopItemCategory'>;

    @XViewColumn()
    shopItemCategoryName: string;

    @XViewColumn()
    detailsUrl: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    canPurchase: boolean;
}