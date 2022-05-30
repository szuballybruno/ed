import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ShopItemStatefulView {

    @ViewColumn()
    @XViewColumn()
    id: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    name: string;

    @ViewColumn()
    @XViewColumn()
    detailsUrl: string;

    @ViewColumn()
    @XViewColumn()
    purchaseCount: number;

    @ViewColumn()
    @XViewColumn()
    canPurchase: boolean;

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