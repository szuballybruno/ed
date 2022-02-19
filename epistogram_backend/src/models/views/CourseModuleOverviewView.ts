import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseModuleOverviewView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    moduleId: number;

    @ViewColumn()
    moduleName: string;

    @ViewColumn()
    videoTitle: string;

    @ViewColumn()
    videoLengthSeconds: number;
}