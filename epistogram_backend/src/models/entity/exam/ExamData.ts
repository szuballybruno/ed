import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { ExamVersion } from './ExamVersion';

@Entity()
export class ExamData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    title: string;

    @Column()
    @XViewColumn()
    isFinal: boolean;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    subtitle: string | null;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    description: string | null;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    thumbnailUrl: string | null;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    orderIndex: number | null;

    @Column({ type: 'integer', nullable: true })
    @XViewColumn()
    retakeLimit: number | null;

    // 
    // TO MANY
    // 

    @XOneToMany<ExamData>()(() => ExamVersion, x => x.examData)
    examVersions: ExamVersion[];
}