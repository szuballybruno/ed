import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { PersonalityTraitCategory } from '../PersonalityTraitCategory';
import { QuestionType } from '../QuestionType';
import { QuestionVersion } from './QuestionVersion';

@Entity()
export class QuestionData {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    questionText: string;

    @Column({ type: 'text', nullable: true })
    imageUrl: string | null;

    @Column({ type: 'int', nullable: true })
    orderIndex: number | null;

    @Column({ type: 'double precision', nullable: true })
    showUpTimeSeconds: number | null;

    // 
    // TO ONE 
    //

    // type 
    @Column({ default: 1 })
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