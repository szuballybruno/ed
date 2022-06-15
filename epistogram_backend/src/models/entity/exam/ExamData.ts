import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { ExamVersion } from './ExamVersion';

@Entity()
export class ExamData {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    title: string;

    @Column()
    isFinal: boolean;

    @Column({ type: 'text', nullable: true })
    subtitle: string | null;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ type: 'text', nullable: true })
    thumbnailUrl: string | null;

    @Column({ type: 'int', nullable: true })
    orderIndex: number | null;

    @Column({ type: 'integer', nullable: true })
    retakeLimit: number | null;

    // 
    // TO MANY
    // 

    @XOneToMany<ExamData>()(() => ExamVersion, x => x.examData)
    examVersions: ExamVersion[];
}