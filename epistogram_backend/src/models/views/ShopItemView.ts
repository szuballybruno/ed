import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ShopItemView {

    @ViewColumn()
    @XViewColumn()
    id: Id<'ShopItem'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    name: string;

    @ViewColumn()
    @XViewColumn()
    purchaseLimit: number;

    @ViewColumn()
    @XViewColumn()
    coinPrice: number;

    @ViewColumn()
    @XViewColumn()
    currencyPrice: number;

    @ViewColumn()
    @XViewColumn()
    shopItemCategoryId: Id<'ShopItemCategory'>;

    @ViewColumn()
    @XViewColumn()
    shopItemCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;
}