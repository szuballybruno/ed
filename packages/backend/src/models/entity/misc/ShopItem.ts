import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { CoinTransaction } from './CoinTransaction';
import { Course } from '../course/Course';
import { DiscountCode } from './DiscountCode';
import { ShopItemCategory } from './ShopItemCategory';
import { StorageFile } from './StorageFile';

@Entity()
export class ShopItem {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ShopItem'>;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    name: string | null;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    purchaseLimit: number | null;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    detailsUrl: string | null;

    @Column()
    @XViewColumn()
    coinPrice: number;

    @Column()
    @XViewColumn()
    currencyPrice: number;

    // TO ONE

    // shop item category 
    @Column()
    @XViewColumn()
    shopItemCategoryId: Id<'ShopItemCategory'>;
    @ManyToOne(_ => ShopItemCategory, x => x.shopItems)
    @JoinColumn({ name: 'shop_item_category_id' })
    shopItemCategory: ShopItemCategory;

    // shop item category 
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    coverFileId: Id<'StorageFile'> | null;
    @ManyToOne(_ => StorageFile)
    @JoinColumn({ name: 'cover_file_id' })
    coverFile: StorageFile | null;

    // course
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    courseId: Id<'Course'> | null;
    @ManyToOne(_ => Course, x => x.shopItems)
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;

    // TO MANY

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.shopItem)
    coinAcquires: CoinTransaction[];

    // discount codes
    @JoinColumn()
    @ManyToOne(_ => DiscountCode, x => x.shopItem)
    discountCodes: DiscountCode[];
}