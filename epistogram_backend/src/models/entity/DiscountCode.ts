import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItem } from './ShopItem';
import { User } from './User';

@Entity()
export class DiscountCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    // user 
    @Column({ type: 'integer', nullable: true })
    userId: number | null;

    @ManyToOne(_ => User, x => x.discountCodes)
    @JoinColumn({ name: 'user_id' })
    user: User | null;

    // shop item
    @Column()
    shopItemId: number;

    @OneToMany(_ => ShopItem, x => x.discountCodes)
    @JoinColumn({ name: 'shop_item_id' })
    shopItem: ShopItem;
}