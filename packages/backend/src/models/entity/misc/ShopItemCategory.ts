import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { ShopItem } from './ShopItem';

@Entity()
export class ShopItemCategory {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ShopItemCategory'>;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

    // shop items
    @ManyToOne(_ => ShopItem, x => x.shopItemCategory)
    @JoinColumn()
    shopItems: ShopItem[];
}