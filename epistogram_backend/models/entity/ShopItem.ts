import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { ShopItemCategory } from "./ShopItemCategory";
import { StorageFile } from "./StorageFile";

@Entity()
export class ShopItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    coinPrice: number;

    @Column()
    currencyPrice: number;

    // shop item category 
    @Column()
    shopItemCategoryId: number;

    @ManyToOne(_ => ShopItemCategory, x => x.shopItems)
    @JoinColumn({ name: "shop_item_category_id" })
    shopItemCategory: ShopItemCategory;

    // shop item category 
    @Column({ nullable: true, type: "integer" })
    coverFileId: number | null;

    @ManyToOne(_ => StorageFile, x => x.shopItems)
    @JoinColumn({ name: "cover_file_id" })
    coverFile: StorageFile | null;

    // course
    @Column({ nullable: true, type: "integer" })
    courseId: number | null;

    @ManyToOne(_ => Course, x => x.shopItems)
    @JoinColumn({ name: "course_id" })
    course: Course | null;
}