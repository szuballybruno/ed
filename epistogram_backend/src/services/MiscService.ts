
import { User } from '../models/entity/User';
import { CourseOverviewView } from '../models/views/CourseOverviewView';
import { CourseOverviewDataDTO } from '../shared/dtos/CourseOverviewDataDTO';
import { CourseShortDTO } from '../shared/dtos/CourseShortDTO';
import { OverviewPageDTO } from '../shared/dtos/OverviewPageDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/ActionParams';
import { CourseProgressService } from './CourseProgressService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class MiscService {

    constructor(
        private _courseProgressService: CourseProgressService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _userCourseBridgeService: UserCourseBridgeService) {
    }

    async getCourseOverviewDataAsync(principalId: PrincipalId) {

        const userId = Id
            .create<User>(principalId.toSQLValue());

        const courseId = await this._userCourseBridgeService
            .getCurrentCourseIdOrFail(userId);

        const view = await this._ormService
            .query(CourseOverviewView, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();

        return this._mapperService
            .mapTo(CourseOverviewDataDTO, [view]);
    }

    async getOverviewPageDTOAsync(principalId: PrincipalId) {

        const userId = Id
            .create<User>(principalId.toSQLValue());

        const recommendedCourseDTOs = [] as CourseShortDTO[];
        const developmentChartData = this.getDevelopmentChart();

        const currentCourseProgress = await this
            ._courseProgressService
            .getCurrentCourseProgressAsync(userId);

        const overviewPageDTO = {
            tipOfTheDay: this.getTipOfTheDay(),
            recommendedCourses: recommendedCourseDTOs,
            developmentChartData: developmentChartData,
            currentCourseProgress
        } as OverviewPageDTO;

        return overviewPageDTO;
    };

    private getTipOfTheDay = () => 'Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!';

    private getDevelopmentChart = () => {
        return {
            labels: ['30 nap', '45 nap', '60 nap', '75 nap', '90 nap'],
            datasets: [
                {
                    label: 'Epistogram',
                    data: [12, 19, 12, 17, 8],
                    fill: false,
                    backgroundColor: 'rgb(63,178,181)',
                    borderColor: 'rgba(13,104,140,0.2)',
                    tension: 0.5
                },
                {
                    label: 'Hagyományos tréningek',
                    data: [3, 5, 4, 5, 2],
                    fill: false,
                    backgroundColor: 'rgb(215,33,163)',
                    borderColor: 'rgba(139,0,155,0.2)',
                    tension: 0.5
                }
            ],
        };
    };
}
