import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { ShopItem } from '../entity/ShopItem';
import { ShopItemCategory } from '../entity/ShopItemCategory';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ShopItemView {

    @ViewColumn()
    @XViewColumn()
    id: Id<ShopItem>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<Course>;

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
    shopItemCategoryId: Id<ShopItemCategory>;

    @ViewColumn()
    @XViewColumn()
    shopItemCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;
}