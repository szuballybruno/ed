
import { Organization } from "../models/entity/Organization";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { staticProvider } from "../staticProvider";
import { getCourseItemsAsync, getCurrentCourseItemDescriptorCodeAsync } from "./courseService";
import { toOrganizationDTO } from "./mappings";
import { getReandomQuestion } from "./questionService";

export const getOrganizationsAsync = async (userId: number) => {

    const orgs = await staticProvider
        .ormConnection
        .getRepository(Organization)
        .find();

    return orgs
        .map(org => toOrganizationDTO(org));
}

export const getOverviewPageDTOAsync = async (userId: number) => {

    const itemCode = await getCurrentCourseItemDescriptorCodeAsync(userId);
    const courseItems = itemCode ? await getCourseItemsAsync(userId, itemCode) : [];
    const recommendedCourseDTOs = [] as CourseShortDTO[];
    const randomQuestion = getReandomQuestion();
    const currntTasks = getCurrentTasks();
    const developmentChartData = getDevelopmentChart();

    const overviewPageDTO = {
        tipOfTheDay: tipOfTheDay,
        recommendedCourses: recommendedCourseDTOs,
        testQuestionDTO: randomQuestion,
        currentTasks: currntTasks,
        developmentChartData: developmentChartData,
        currentCourseItems: courseItems
    } as OverviewPageDTO;

    return overviewPageDTO;
}

const tipOfTheDay = "Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!"

const getCurrentTasks = () => {
    return {
        tasks: [
            {
                text: "Office kurzus gyakorlása",
                dueDate: "",
                objective: "practise"
            } as TaskDTO,
            {
                text: "PHP videók megtekintése",
                dueDate: "",
                objective: "continueVideo"
            } as TaskDTO,
            {
                text: "Word kurzus végi vizsga",
                dueDate: "",
                objective: "exam"
            } as TaskDTO
        ]
    } as CurrentTasksDTO;
}

const getDevelopmentChart = () => {
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
