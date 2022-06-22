import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '../StorageFile';
import { ModuleVersion } from './ModuleVersion';

@Entity()
export class ModuleData {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    orderIndex: number;

    @Column()
    isPretestModule: boolean;

    // 
    // TO ONE
    //

    // image file 
    @Column({ nullable: true, type: 'integer' })
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