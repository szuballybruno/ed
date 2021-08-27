import { User } from "../models/entity/User";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { TestAnswerDTO } from "../models/shared_models/TestAnswerDTO";
import { TestQuestionDTO } from "../models/shared_models/TestQuestionDTO";
import { getTypeORMConnection } from "../database";
import { log } from "./misc/logger";
import { toExamDTO, toOrganizationDTO, toVideoDTO } from "./mappings";
import { Organization } from "../models/entity/Organization";

export const getOrganizationsAsync = async (userId: number) => {

    const orgs = await getTypeORMConnection()
        .getRepository(Organization)
        .find();

    return orgs
        .map(org => toOrganizationDTO(org));
}

export const getOverviewPageDTOAsync = async (userId: number) => {

    // const userData = await getUserDataAsync(userId);

    const user = await getTypeORMConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.currentCourse", "course")
        .leftJoinAndSelect("user.currentVideo", "video")
        .leftJoinAndSelect("user.currentExam", "exam")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .getOneOrFail();

    const currentCourse = user.currentCourse;
    const currentVideo = user.currentVideo;
    const currentExam = user.currentExam;

    const videoDTOs = currentCourse
        ?.videos
        ?.map(course => toVideoDTO(course));

    const examDTOs = currentCourse
        ?.videos
        ?.map(course => toExamDTO(course));

    const recommendedCourseDTOs = [] as CourseShortDTO[];
    const randomQuestion = getReandomQuestion();
    const currntTasks = getCurrentTasks();
    const developmentChartData = getDevelopmentChart();

    const overviewPageDTO = {

        tipOfTheDay: tipOfTheDay,
        currentCourseId: currentCourse?.id ?? null,

        currentCourseVideos: videoDTOs ?? null,
        currentCourseExams: examDTOs ?? null,

        currentCourseVideo: currentVideo ? toVideoDTO(currentVideo) : null,
        currentCourseExam: currentExam ? toExamDTO(currentExam) : null,

        recommendedCourses: recommendedCourseDTOs,
        testQuestionDTO: randomQuestion,
        currentTasks: currntTasks,
        developmentChartData: developmentChartData

    } as OverviewPageDTO;

    log(overviewPageDTO);

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

const getReandomQuestion = () => {
    return {
        questionId: "asd",
        questionText: "My fantastic question",
        answers: [
            {
                answerId: "asd",
                answerText: "Answer 1"
            } as TestAnswerDTO,
            {
                answerId: "asd",
                answerText: "Answer 2"
            } as TestAnswerDTO,
            {
                answerId: "asd",
                answerText: "Answer 3"
            } as TestAnswerDTO,
            {
                answerId: "asd",
                answerText: "Answer 4"
            } as TestAnswerDTO
        ]
    } as TestQuestionDTO
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