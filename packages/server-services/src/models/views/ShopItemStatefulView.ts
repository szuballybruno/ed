import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class ShopItemStatefulView {

    @XViewColumn()
    id: Id<'ShopItem'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    detailsUrl: string;

    @XViewColumn()
    purchaseCount: number;

    @XViewColumn()
    canPurchase: boolean;

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
    coverFilePath: string;
}