import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseData } from '../course/CourseData';
import { CourseRatingQuestion } from './CourseRatingQuestion';

@Entity()
export class CourseRatingGroup {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // courseRatingQuestions
    @JoinColumn()
    @OneToMany(_ => CourseRatingQuestion, x => x.courseRatingGroup)
    courseRatingQuestions: CourseRatingQuestion[];
}