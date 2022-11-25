import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XOneToMany, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { StorageFile } from '../misc/StorageFile';
import { ModuleVersion } from './ModuleVersion';

@Entity()
export class ModuleData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ModuleData'>;

    @Column()
    @XViewColumn()
    name: string;

    @Column()
    @XViewColumn()
    description: string;

    @Column()
    @XViewColumn()
    orderIndex: number;

    // 
    // TO ONE
    //

    // image file 
    @Column({ nullable: true, type: 'integer' })
    @XViewColumn()
    imageFileId: Id<'StorageFile'> | null;
    @OneToOne(_ => StorageFile)
    @JoinColumn({ name: 'image_file_id' })
    imageFile: StorageFile | null;

    // 
    // TO MANY 
    //

    @XOneToMany<ModuleData>()(() => ModuleVersion, x => x.moduleData)
    moduleVersions: Relation<ModuleVersion>[];
}