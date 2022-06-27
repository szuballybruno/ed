import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '../StorageFile';
import { ModuleVersion } from './ModuleVersion';

@Entity()
export class ModuleData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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
    imageFileId: number | null;
    @OneToOne(_ => StorageFile, x => x.courseModule)
    @JoinColumn({ name: 'image_file_id' })
    imageFile: StorageFile | null;

    // 
    // TO MANY 
    //

    @XOneToMany<ModuleData>()(() => ModuleVersion, x => x.moduleData)
    moduleVersions: ModuleVersion[];
}