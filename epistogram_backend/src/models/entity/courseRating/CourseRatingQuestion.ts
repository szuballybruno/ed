import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseRatingQuesitonType } from '../../../shared/types/sharedTypes';
import { CourseRatingGroup } from './CourseRatingGroup';
import { CourseRatingQuestionUserAnswer } from './CourseRatingQuestionUserAnswer';

@Entity()
export class CourseRatingQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: 'text' })
    type: CourseRatingQuesitonType;

    // group
    @Column()
    courseRatingGroupId: number;

    @JoinColumn({ name: 'course_rating_group_id' })
    @ManyToOne(_ => CourseRatingGroup, x => x.courseRatingQuestions)
    courseRatingGroup: CourseRatingGroup;

    // user answers 
    @JoinColumn()
    @OneToMany(_ => CourseRatingQuestionUserAnswer, x => x.courseRatingQuestion)
    userAnswers: CourseRatingQuestionUserAnswer[];
}