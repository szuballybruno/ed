"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverviewPageDTOAsync = exports.getOrganizationsAsync = void 0;
const Organization_1 = require("../models/entity/Organization");
const User_1 = require("../models/entity/User");
const staticProvider_1 = require("../staticProvider");
const mappings_1 = require("./mappings");
const questionService_1 = require("./questionService");
const getOrganizationsAsync = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Organization_1.Organization)
        .find();
    return orgs
        .map(org => mappings_1.toOrganizationDTO(org));
});
exports.getOrganizationsAsync = getOrganizationsAsync;
const getOverviewPageDTOAsync = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const userData = await getUserDataAsync(userId);
    var _a, _b, _c;
    const user = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
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
    const videoDTOs = (_a = currentCourse === null || currentCourse === void 0 ? void 0 : currentCourse.videos) === null || _a === void 0 ? void 0 : _a.map(video => mappings_1.toVideoDTO(video));
    const examDTOs = (_b = currentCourse === null || currentCourse === void 0 ? void 0 : currentCourse.exams) === null || _b === void 0 ? void 0 : _b.map(exam => mappings_1.toExamDTO(exam));
    const recommendedCourseDTOs = [];
    const randomQuestion = questionService_1.getReandomQuestion();
    const currntTasks = getCurrentTasks();
    const developmentChartData = getDevelopmentChart();
    const overviewPageDTO = {
        tipOfTheDay: tipOfTheDay,
        currentCourseId: (_c = currentCourse === null || currentCourse === void 0 ? void 0 : currentCourse.id) !== null && _c !== void 0 ? _c : null,
        currentCourseVideos: videoDTOs !== null && videoDTOs !== void 0 ? videoDTOs : null,
        currentCourseExams: examDTOs !== null && examDTOs !== void 0 ? examDTOs : null,
        currentCourseVideo: currentVideo ? mappings_1.toVideoDTO(currentVideo) : null,
        currentCourseExam: currentExam ? mappings_1.toExamDTO(currentExam) : null,
        recommendedCourses: recommendedCourseDTOs,
        testQuestionDTO: randomQuestion,
        currentTasks: currntTasks,
        developmentChartData: developmentChartData
    };
    return overviewPageDTO;
});
exports.getOverviewPageDTOAsync = getOverviewPageDTOAsync;
const tipOfTheDay = "Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!";
const getCurrentTasks = () => {
    return {
        tasks: [
            {
                text: "Office kurzus gyakorlása",
                dueDate: "",
                objective: "practise"
            },
            {
                text: "PHP videók megtekintése",
                dueDate: "",
                objective: "continueVideo"
            },
            {
                text: "Word kurzus végi vizsga",
                dueDate: "",
                objective: "exam"
            }
        ]
    };
};
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
    };
};
//# sourceMappingURL=dataService.js.map