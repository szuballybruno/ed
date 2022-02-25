import { UserCourseCompletionEstimationView } from "../models/views/UserCourseCompletionEstimationView";
import { UserDailyCourseItemProgressView } from "../models/views/UserDailyCourseItemProgressView";
import { UserDailyProgressView } from "../models/views/UserDailyProgressView";
import { UserCourseProgressChartDTO } from "../shared/dtos/UserCourseProgressChartDTO";
import { UserDailyProgressDTO } from "../shared/dtos/UserDailyProgressDTO";
import { MapperService } from "./MapperService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class UserProgressService extends ServiceBase {

    constructor(mapperService: MapperService, ormservice: ORMConnectionService) {

        super(mapperService, ormservice);
    }

    async getProgressChartDataAsync(userId: number) {

        const courseId = 4;

        const estimationView = await this._ormService
            .getRepository(UserCourseCompletionEstimationView)
            .createQueryBuilder("uccev")
            .where("uccev.userId = :userId", { userId })
            .andWhere("uccev.courseId = :courseId", { courseId })
            .getOneOrFail();

        const dailyViews = await this._ormService
            .getRepository(UserDailyCourseItemProgressView)
            .createQueryBuilder("udcipv")
            .where("udcipv.courseId = :courseId", { courseId })
            .andWhere("udcipv.userId = :userId", { userId })
            .getMany();

        console.log(estimationView)
        console.log(dailyViews)

        const dto = {
            courseLengthSeconds: estimationView.courseLengthSeconds,
            estimatedCompletionDate: estimationView.estimatedCompletionDate,
            estimatedLengthInDays: estimationView.estimatedLengthInDays,
            estimatedSecondsPerDay: estimationView.estimatedSecondsPerDay,
            originalCompletionDaysEstimation: estimationView.originalCompletionDaysEstimation,
            startDate: estimationView.startDate,
            days: dailyViews
                .map(x => ({
                    completedItemCount: x.completedItemCount,
                    completedPercentage: x.completedPercentage,
                    completionDate: x.completionDate,
                    offsetDaysFromStart: x.offsetDaysFromStart
                }))
        } as UserCourseProgressChartDTO;

        return dto;
    }
}