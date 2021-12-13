import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class ShopItemView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    isPurchased: boolean;

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