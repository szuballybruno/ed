import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ShopItemStatefulView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    detailsUrl: string;

    @ViewColumn()
    purchaseCount: number;

    @ViewColumn()
    canPurchase: boolean;

    @ViewColumn()
    purchaseLimit: number;

    @ViewColumn()
    coinPrice: number;

    @ViewColumn()
    currencyPrice: number;

    @ViewColumn()
    shopItemCategoryId: number;

    @ViewColumn()
    shopItemCategoryName: string;

    @ViewColumn()
    coverFilePath: string;
}