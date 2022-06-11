import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../../services/XORM/XORMDecorators';
import { ExamType } from '../../../shared/types/sharedTypes';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    title: string;

    @Column()
    type: ExamType;

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
}