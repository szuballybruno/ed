import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { Answer } from './Answer';
import { Exam } from './Exam';
import { GivenAnswer } from './GivenAnswer';
import { PersonalityTraitCategory } from './PersonalityTraitCategory';
import { QuestionType } from './QuestionType';
import { Video } from './Video';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

    @Column()
    questionText: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true, type: 'integer' })
    orderIndex: number | null;

    @Column({ nullable: true, type: 'double precision' })
    showUpTimeSeconds: number;

    // category
    @Column({ nullable: true })
    personalityTraitCategoryId: number;

    @ManyToOne(_ => PersonalityTraitCategory, x => x.questions)
    @JoinColumn({ name: 'personality_trait_category_id' })
    personalityTraitCategory: PersonalityTraitCategory | null;

    // type 
    @Column({ default: 1 })
    typeId: number;

    @ManyToOne(_ => QuestionType, x => x.questions)
    @JoinColumn({ name: 'type_id' })
    type: QuestionType;

    // answers
    @OneToMany(type => Answer, answer => answer.question, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn()
    answers: Answer[];

    // given answers
    @OneToMany(_ => GivenAnswer, x => x.question)
    @JoinColumn()
    givenAnswers: GivenAnswer[];

    // video 
    @Column({ nullable: true })
    videoId: number;

    @ManyToOne(() => Video, v => v.questions)
    @JoinColumn({ name: 'video_id' })
    video: Video;

    // exam 
    @Column({ nullable: true })
    examId: number | null;

    @ManyToOne(_ => Exam, e => e.questions)
    @JoinColumn({ name: 'exam_id' })
    exam: Exam | null;
}