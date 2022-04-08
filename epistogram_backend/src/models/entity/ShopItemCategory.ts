import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItem } from './ShopItem';

@Entity()
export class ShopItemCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // shop items
    @ManyToOne(_ => ShopItem, x => x.shopItemCategory)
    @JoinColumn()
    shopItems: ShopItem[];
}