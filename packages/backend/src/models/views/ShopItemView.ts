import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class ShopItemView {

    @XViewColumn()
    id: Id<'ShopItem'>;

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
    coverFilePath: string;
}