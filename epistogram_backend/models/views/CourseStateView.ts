import { JoinColumn, OneToOne, ViewColumn, ViewEntity } from "typeorm";
import { Course } from "../entity/Course";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseStateView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    isComplete: boolean;

    // course 
    @OneToOne(_ => Course, x => x.courseState)
    @JoinColumn({ name: "courseId" })
    course: Course;
}