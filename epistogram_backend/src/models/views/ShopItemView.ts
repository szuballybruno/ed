import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ShopItemView {

    @ViewColumn()
    @XViewColumn()
    id: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

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
    shopItemCategoryId: number;

    @ViewColumn()
    @XViewColumn()
    shopItemCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;
}