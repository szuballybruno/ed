import { JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { Exam } from "../Exam";
import { Video } from "../Video";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseItemStateView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    isVideoCompleted: boolean;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    isExamCompleted: boolean;

    // exam 
    @ManyToOne(_ => Exam)
    @JoinColumn({ name: "examId" })
    exam: Exam;

    // exam 
    @ManyToOne(_ => Video)
    @JoinColumn({ name: "videoId" })
    video: Video;
}