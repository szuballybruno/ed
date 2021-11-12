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
    isCompleted: boolean;

    @ViewColumn()
    isStarted: boolean;

    @ViewColumn()
    currentItemCode: string;

    @ViewColumn()
    title: string;

    @ViewColumn()
    filePath: string;

    @ViewColumn()
    categoryName: string;

    @ViewColumn()
    subCategoryName: string;

    // user
    @ManyToOne(_ => User)
    @JoinColumn({ name: "teacherId" })
    teacher: User;
}
