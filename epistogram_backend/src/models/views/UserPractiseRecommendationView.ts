import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPractiseRecommendationView {

    @ViewColumn()
    questionId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    totalCorrectAnswerCount: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    lastThreeAnswerAverage: number;

}