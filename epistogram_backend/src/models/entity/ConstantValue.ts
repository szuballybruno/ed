import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@Entity()
export class ConstantValue {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ConstantValue'>;

    @XViewColumn()
    @Column()
    key: string;

    @XViewColumn()
    @Column({ type: 'double precision' })
    value: number;
}