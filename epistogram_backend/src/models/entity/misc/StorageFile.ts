import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
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