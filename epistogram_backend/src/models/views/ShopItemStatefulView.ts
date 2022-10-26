import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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