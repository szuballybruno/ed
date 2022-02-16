import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../Course";
import { User } from "../User";
import { CourseRatingQuestion } from "./CourseRatingQuestion";

@Entity()
export class CourseRatingQuestionUserAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    value: number;

    // quesiton
    @Column()
    courseRatingQuestionId: number;

    @JoinColumn({ name: "course_rating_question_id" })
    @ManyToOne(_ => CourseRatingQuestion, x => x.userAnswers)
    courseRatingQuestion: CourseRatingQuestion;

    // user
    @Column()
    userId: number;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(_ => User, x => x.courseRatingAnswers)
    user: User;

    // course 
    @Column()
    courseId: number;

    @JoinColumn({ name: "course_id" })
    @ManyToOne(_ => Course, x => x.courseRatingUserAnswers)
    course: Course;
}