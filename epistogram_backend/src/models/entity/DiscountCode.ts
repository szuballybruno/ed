import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { ShopItem } from './ShopItem';
import { User } from './User';

function logType(target: any, key: string) {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log(`${key} type: ${t.name}`);
}

@Entity()
export class DiscountCode {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'DiscountCode'>;

    @Column()
    @XViewColumn()
    code: string;

    // user 
    @logType
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    userId: Id<'User'> | null;
    @ManyToOne(_ => User, x => x.discountCodes)
    @JoinColumn({ name: 'user_id' })
    user: User | null;

    // shop item
    @Column()
    @XViewColumn()
    shopItemId: Id<'ShopItem'>;
    @OneToMany(_ => ShopItem, x => x.discountCodes)
    @JoinColumn({ name: 'shop_item_id' })
    shopItem: Relation<ShopItem>;
}