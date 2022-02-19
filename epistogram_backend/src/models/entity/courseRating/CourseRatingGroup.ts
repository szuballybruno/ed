import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../Course";
import { CourseRatingQuestion } from "./CourseRatingQuestion";

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