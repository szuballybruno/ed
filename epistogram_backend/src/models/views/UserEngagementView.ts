import { ViewColumn, ViewEntity } from 'typeorm';
import { SessionActivityType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserEngagementView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    sessionId: number;

    @ViewColumn()
    courseCreationDate: number;

    @ViewColumn()
    startDate: number;

    @ViewColumn()
    endDate: number;

    @ViewColumn()
    lengthSeconds: number;

    @ViewColumn()
    completedPercentage: number;

    @ViewColumn()
    activityType: SessionActivityType;

    @ViewColumn()
    activityVideoId: number;

    @ViewColumn()
    activityExamId: number;

    @ViewColumn()
    activityCreationDate: number;
}