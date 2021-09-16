import { JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { CourseItemStateType } from "../../shared_models/types/sharedTypes";
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
    orderIndex: number;

    @ViewColumn()
    isVideoCompleted: boolean;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    isExamCompleted: boolean;

    @ViewColumn()
    state: CourseItemStateType;

    // exam 
    @ManyToOne(_ => Exam)
    @JoinColumn({ name: "examId" })
    exam: Exam;

    // exam 
    @ManyToOne(_ => Video)
    @JoinColumn({ name: "videoId" })
    video: Video;
}