import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { ShopItem } from './ShopItem';

@Entity()
export class ShopItemCategory {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

    // shop items
    @ManyToOne(_ => ShopItem, x => x.shopItemCategory)
    @JoinColumn()
    shopItems: ShopItem[];
}