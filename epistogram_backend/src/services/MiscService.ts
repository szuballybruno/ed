
import { Organization } from "../models/entity/Organization";
import { User } from "../models/entity/User";
import { CourseOverviewDataDTO } from "../shared/dtos/CourseOverviewDataDTO";
import { CourseShortDTO } from "../shared/dtos/CourseShortDTO";
import { OverviewPageDTO } from "../shared/dtos/OverviewPageDTO";
import { UserDTO } from "../shared/dtos/UserDTO";
import { CourseOverviewView } from "../models/views/CourseOverviewView";
import { CourseService } from "./CourseService";
import { MapperService } from "./MapperService";
import { toOrganizationDTO } from "./misc/mappings";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class MiscService {

    private _courseService: CourseService;
    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(
        courseService: CourseService,
        ormService: ORMConnectionService,
        mapperService: MapperService,
        userCourseBridgeService: UserCourseBridgeService) {

        this._courseService = courseService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._userCourseBridgeService = userCourseBridgeService;
    }

    getOrganizationsAsync = async (userId: number) => {

        const orgs = await this._ormService
            .getRepository(Organization)
            .find();

        return orgs
            .map(org => toOrganizationDTO(org));
    }

    saveUserDataAsync = async (userId: number, dto: UserDTO) => {

        return this._ormService
            .getRepository(User)
            .save({
                id: userId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber
            });
    }

    async getCourseOverviewDataAsync(userId: number) {

        const courseId = await this._userCourseBridgeService
            .getCurrentCourseIdOrFail(userId);

        const view = await this._ormService
            .getSingle(CourseOverviewView,
                [
                    ["WHERE", "courseId", "=", "courseId"],
                    ["AND", "userId", "=", "userId"]
                ],
                {
                    courseId,
                    userId
                });

        return this._mapperService
            .map(CourseOverviewView, CourseOverviewDataDTO, view);
    }

    getOverviewPageDTOAsync = async (userId: number) => {

        const recommendedCourseDTOs = [] as CourseShortDTO[];
        const developmentChartData = this.getDevelopmentChart();

        const currentCourseProgress = await this._courseService
            .getCurrentCourseProgressAsync(userId);

        const overviewPageDTO = {
            tipOfTheDay: this.getTipOfTheDay(),
            recommendedCourses: recommendedCourseDTOs,
            developmentChartData: developmentChartData,
            currentCourseProgress
        } as OverviewPageDTO;

        return overviewPageDTO;
    }

    private getTipOfTheDay = () => "Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!"

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
        }
    }
}
