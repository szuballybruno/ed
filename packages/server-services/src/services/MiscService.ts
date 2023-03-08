
import { Id } from '@episto/commontypes';
import { ActivationCodeListDTO, AvailableCourseDTO, CourseOverviewDataDTO, OverviewPageDTO, QuestionModuleCompareDTO } from '@episto/communication';
import { ActivationCodeListView } from '../models/views/ActivationCodeListView';
import { CourseOverviewView } from '../models/views/CourseOverviewView';
import { QuestionModuleCompareView } from '../models/views/QuestionModuleCompareView';
import { PrincipalId } from '@thinkhub/x-core';
import { CourseProgressService } from './CourseProgressService';
import { DomainProviderService } from './DomainProviderService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class MiscService {

    constructor(
        private _courseProgressService: CourseProgressService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _domainProvider: DomainProviderService) {
    }

    async getCourseOverviewDataAsync(
        principalId: PrincipalId,
        userId: Id<'User'> | null,
        courseId: Id<'Course'> | null
    ) {

        console.log('userId: ' + userId);
        console.log('courseId: ' + courseId);

        const uId = userId !== null
            ? userId
            : Id.create<'User'>(principalId.toSQLValue());

        const cId = courseId !== null
            ? courseId
            : await this._userCourseBridgeService
                .getCurrentCourseIdOrFail(uId);

        const view = await this._ormService
            .query(CourseOverviewView, { courseId: cId, userId: uId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getSingle();

        return this._mapperService
            .mapTo(CourseOverviewDataDTO, [view]);
    }

    async getCourseOverviewModuleCompareDataAsync(
        principalId: PrincipalId,
        userId?: Id<'User'>,
        courseId?: Id<'Course'>
    ) {

        const uId = userId
            ? userId
            : Id.create<'User'>(principalId.toSQLValue());

        const cId = courseId
            ? courseId
            : await this._userCourseBridgeService
                .getCurrentCourseIdOrFail(uId);

        const view = await this._ormService
            .query(QuestionModuleCompareView, { courseId: cId, userId: uId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(QuestionModuleCompareDTO, [view]);
    }

    async getOverviewPageDTOAsync(principalId: PrincipalId) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const recommendedCourseDTOs = [] as AvailableCourseDTO[];
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
    }

    async getActivationCodeList(
        urlTemplate: string,
        companyId: Id<'Company'>) {

        const codes = await this
            ._ormService
            .query(ActivationCodeListView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        const domain = await this
            ._domainProvider
            .getDomainByCompanyAsync(companyId);

        return this
            ._mapperService
            .mapTo(ActivationCodeListDTO, [codes, domain, urlTemplate]);
    }

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
