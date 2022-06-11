import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerSessionType } from '../../shared/types/sharedTypes';
import { Exam } from './exam/Exam';
import { GivenAnswer } from './GivenAnswer';
import { User } from './User';
import { Video } from './video/Video';

@Entity()
export class AnswerSession {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'timestamptz' })
    startDate: Date | null;

    @Column({ nullable: true, type: 'timestamptz' })
    endDate: Date | null;

    @Column({ default: 'exam' as AnswerSessionType })
    type: AnswerSessionType;

    // given answers
    @OneToMany(_ => GivenAnswer, x => x.answerSession)
    @JoinColumn()
    givenAnswers: GivenAnswer[];

    // exam
    @Column({ nullable: true })
    examId: number | null;

    @ManyToOne(_ => Exam, e => e.answerSessions)
    @JoinColumn({ name: 'exam_id' })
    exam: Exam | null;

    // video 
    @Column({ nullable: true })
    videoId: number | null;

    @ManyToOne(_ => Video, e => e.answerSessions)
    @JoinColumn({ name: 'video_id' })
    video: Video | null;

    // user 
    @Column({ nullable: true })
    userId: number | null;

    @ManyToOne(_ => User, e => e.answerSessions)
    @JoinColumn({ name: 'user_id' })
    user: User | null;
}