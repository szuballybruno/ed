import { ViewColumn, ViewEntity } from 'typeorm';
import { CourseItemStateType, CourseItemType, CourseModeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemStateView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    itemId: number;

    @ViewColumn()
    moduleId: number;

    @ViewColumn()
    moduleName: string;

    @ViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    moduleCode: string;

    @ViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    itemTitle: string;

    @ViewColumn()
    itemType: CourseItemType;

    @ViewColumn()
    itemSubtitle: string;

    @ViewColumn()
    itemCode: string;

    @ViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    courseMode: CourseModeType;

    @ViewColumn()
    isModuleCurrent: boolean;

    @ViewColumn()
    state: CourseItemStateType;
}