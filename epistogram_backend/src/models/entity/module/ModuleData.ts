import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../../services/XORM/XORMDecorators';
import { StorageFile } from '../StorageFile';

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

    // image file 
    @Column({ nullable: true, type: 'integer' })
    imageFileId: number | null;

    @OneToOne(_ => StorageFile, x => x.courseModule)
    @JoinColumn({ name: 'image_file_id' })
    imageFile: StorageFile | null;
}