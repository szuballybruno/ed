import { JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { User } from "../entity/User";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    isComplete: boolean;

    @ViewColumn()
    isStarted: boolean;

    @ViewColumn()
    currentExamId: number;

    @ViewColumn()
    currentVideoId: number;

    @ViewColumn()
    title: string;

    @ViewColumn()
    filePath: string;

    @ViewColumn()
    category: string;

    // user
    @ManyToOne(_ => User)
    @JoinColumn({ name: "teacherId" })
    teacher: User;
}
