import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemStateType, CourseItemType, CourseModeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemStateView {

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    videoId: number;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    @ViewColumn()
    @XViewColumn()
    itemId: number;

    @ViewColumn()
    @XViewColumn()
    moduleId: number;

    @ViewColumn()
    @XViewColumn()
    moduleName: string;

    @ViewColumn()
    @XViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    @XViewColumn()
    moduleCode: string;

    @ViewColumn()
    @XViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    @XViewColumn()
    itemTitle: string;

    @ViewColumn()
    @XViewColumn()
    itemType: CourseItemType;

    @ViewColumn()
    @XViewColumn()
    itemSubtitle: string;

    @ViewColumn()
    @XViewColumn()
    itemCode: string;

    @ViewColumn()
    @XViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    courseMode: CourseModeType;

    @ViewColumn()
    @XViewColumn()
    isModuleCurrent: boolean;

    @ViewColumn()
    @XViewColumn()
    state: CourseItemStateType;

    @ViewColumn()
    @XViewColumn()
    shouldRepeatVideo: boolean;
}