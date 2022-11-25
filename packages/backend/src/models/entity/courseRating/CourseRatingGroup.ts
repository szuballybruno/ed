import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '@episto/xorm';
import { CourseRatingQuestion } from './CourseRatingQuestion';

@Entity()
export class CourseRatingGroup {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

    // courseRatingQuestions
    @JoinColumn()
    @OneToMany(_ => CourseRatingQuestion, x => x.courseRatingGroup)
    courseRatingQuestions: CourseRatingQuestion[];
}