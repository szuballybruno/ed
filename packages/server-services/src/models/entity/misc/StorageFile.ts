import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';

@Entity()
export class StorageFile {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'StorageFile'>;

    @Column()
    @XViewColumn()
    filePath: string;
}