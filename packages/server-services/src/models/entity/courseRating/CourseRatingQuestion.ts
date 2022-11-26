import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '@episto/x-orm';
import { CourseRatingQuesitonType } from '@episto/commontypes';
import { CourseRatingGroup } from './CourseRatingGroup';
import { CourseRatingQuestionUserAnswer } from './CourseRatingQuestionUserAnswer';

@Entity()
export class CourseRatingQuestion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    text: string;

    @Column({ type: 'text' })
    @XViewColumn()
    type: CourseRatingQuesitonType;

    // TO ONE

    // group
    @Column()
    @XViewColumn()
    courseRatingGroupId: number;
    @JoinColumn({ name: 'course_rating_group_id' })
    @ManyToOne(_ => CourseRatingGroup, x => x.courseRatingQuestions)
    courseRatingGroup: CourseRatingGroup;

    // TO MANY

    // user answers 
    @JoinColumn()
    @OneToMany(_ => CourseRatingQuestionUserAnswer, x => x.courseRatingQuestion)
    userAnswers: CourseRatingQuestionUserAnswer[];
}