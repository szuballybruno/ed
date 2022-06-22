import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { QuestionType } from '../QuestionType';
import { QuestionVersion } from './QuestionVersion';

@Entity()
export class QuestionData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @Column()
    @XViewColumn()
    questionText: string;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    imageUrl: string | null;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    orderIndex: number | null;

    @Column({ type: 'double precision', nullable: true })
    @XViewColumn()
    showUpTimeSeconds: number | null;

    // 
    // TO ONE 
    //

    // type 
    @Column({ default: 1 })
    @XViewColumn()
    typeId: number;
    @ManyToOne(_ => QuestionType, x => x.questions)
    @JoinColumn({ name: 'type_id' })
    type: QuestionType;

    //
    // TO MANY
    //

    // question versions 
    @XOneToMany<QuestionData>()(() => QuestionVersion, x => x.questionData)
    questionVersions: QuestionVersion[];
}