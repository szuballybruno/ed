
import { Activity } from "../../models/entity/Activity";
import { Course } from "../../models/entity/Course";
import { CourseCategory } from "../../models/entity/CourseCategory";
import { CourseModule } from "../../models/entity/CourseModule";
import { Exam } from "../../models/entity/Exam";
import { Organization } from "../../models/entity/Organization";
import { Question } from "../../models/entity/Question";
import { Role } from "../../models/entity/Role";
import { Video } from "../../models/entity/Video";
import { QuestionTypeEnum, UserRoleEnum } from "../../models/shared_models/types/sharedTypes";
import { staticProvider } from "../../staticProvider";
import { registerInvitedUserAsync } from "../dataService";
import { log } from "./../misc/logger";
import { createInvitedUserWithOrgAsync } from "./../signupService";
import { insertVideoAsync } from "./../videoService";
import { ORMConnectionService } from "./ORMConnectionService";
import { SQLBootstrapperService } from "./SQLBootstrapper";

export class SeedService {

    private _sqlBootstrapperService: SQLBootstrapperService;
    private _ormConnectionService: ORMConnectionService;

    constructor(sqlBootstrapperService: SQLBootstrapperService, ormConnectionService: ORMConnectionService) {

        this._sqlBootstrapperService = sqlBootstrapperService;
        this._ormConnectionService = ormConnectionService;
    }

    seedDBAsync = async () => {

        console.log("------- before");
        await staticProvider.services.sqlConnectionService
            .executeSQLAsync(`
            BEGIN;
                INSERT INTO public.organization (id, name) 
                VALUES (1, 'org1')
                ON CONFLICT (id) DO UPDATE SET 
                    name = EXCLUDED.name;

                SELECT setval('organization_id_seq', (SELECT MAX(id) from organization));

                INSERT INTO public.organization (name) VALUES ('org2');
                END;
            `);
        console.log("------- after");

        console.log(await this._ormConnectionService.getRepository(Organization).find());
        await this._ormConnectionService.getRepository(Organization).insert({ name: "org2" });

        return;

        const executeSeedScriptAsync = this._sqlBootstrapperService.executeSeedScriptAsync;

        await executeSeedScriptAsync("seedOrganizations");
        await executeSeedScriptAsync("seedQuestionTypes");
        await executeSeedScriptAsync("seedActivities");
        await executeSeedScriptAsync("seedRoles");
        await executeSeedScriptAsync("seedSignupExam");
        await executeSeedScriptAsync("seedJobRoles");

        log("seedUsers")
        await this.seedUsersAsync();

        await executeSeedScriptAsync("seedSignupQuestions");
        await executeSeedScriptAsync("seedPersonalityCategoryDescriptions");
        await executeSeedScriptAsync("seedDailyTips");
        await executeSeedScriptAsync("seedCourseCategories");
        await executeSeedScriptAsync("seedCourses");
        await executeSeedScriptAsync("seedExams");

        log("seedVideos")
        await this.seedVideos();

        log("seedVideoQuestions")
        await this.seedVideoQuestions();

        log("seedExamQuestions")
        await this.seedExamQuestions();
    }

    private seedVideos = async () => {

        // course 1 videos
        await insertVideoAsync({
            courseId: 1,
            title: "Ben Awad Rant 1/1",
            subtitle: "Fantastic Video 1",
            description: "Very very fantastic video 1 description",
            orderIndex: 0,
            moduleId: 2
        } as Video, "videos/video_1.mp4");

        await insertVideoAsync({
            courseId: 1,
            title: "Video 1/2",
            subtitle: "Fantastic Video 2",
            description: "Very very fantastic video 2 description",
            orderIndex: 2,
            moduleId: 2
        } as Video);

        // course 4 videos
        await insertVideoAsync({
            courseId: 4,
            title: "Egyszerűbb számítások",
            subtitle: "Alapvető műveletek Excelben",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 0,
            moduleId: 5
        } as Video, "videos/video_2.mp4");

        await insertVideoAsync({
            courseId: 4,
            title: "Cellák és területek azonosítása",
            subtitle: "Alapvető műveletek Excelben",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 1,
            moduleId: 5
        } as Video, "videos/video_3.m4v");

        await insertVideoAsync({
            courseId: 4,
            title: "Adatbevitel, javítás I.",
            subtitle: "Alapvető műveletek Excelben",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 2,
            moduleId: 5
        } as Video, "videos/video_4.m4v");

        await insertVideoAsync({
            courseId: 4,
            title: "Adatbevitel, javítás II.",
            subtitle: "Alapvető műveletek Excelben",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 3,
            moduleId: 5
        } as Video, "videos/video_5.m4v");

        await insertVideoAsync({
            courseId: 4,
            title: "Egyszerűbb számítások 1.",
            subtitle: "Alapvető műveletek Excelben",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 0,
            moduleId: 6
        } as Video, "videos/Excel/video6.mp4");

        await insertVideoAsync({
            courseId: 4,
            title: "Egyszerűbb számítások 2.",
            subtitle: "Alapvető műveletek Excelben",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 1,
            moduleId: 6
        } as Video, "videos/Excel/video4.mp4");

        await insertVideoAsync({
            courseId: 4,
            title: "Egyszerűbb számítások 4.",
            subtitle: "Fix hivatkozás",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 2,
            moduleId: 6
        } as Video, "videos/Excel/video5.mp4");

        await insertVideoAsync({
            courseId: 4,
            title: "Gyakorló feladatok 1.",
            subtitle: "",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 3,
            moduleId: 6
        } as Video, "videos/Excel/video7.mp4");

        await insertVideoAsync({
            courseId: 4,
            title: "Gyakorló feladatok 2.",
            subtitle: "",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 4,
            moduleId: 6
        } as Video, "videos/Excel/video8.mp4");

        await insertVideoAsync({
            courseId: 4,
            title: "Gyakorló feladatok 3.",
            subtitle: "",
            description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
            orderIndex: 6,
            moduleId: 6
        } as Video, "videos/Excel/video9.mp4");
    }

    private seedUsersAsync = async () => {

        log("seeding User 1...")
        const { invitationToken, user } = await createInvitedUserWithOrgAsync(
            {
                firstName: "Endre",
                lastName: "Marosi",
                jobTitleId: 1,
                roleId: UserRoleEnum.administratorId,
                email: "marosi.endre@email.com",
            },
            1,
            false);

        await registerInvitedUserAsync({
            invitationToken: invitationToken,
            password: "admin",
            passwordCompare: "admin"
        });

        log("seeding User 2...")
        const { invitationToken: it2, user: u2 } = await createInvitedUserWithOrgAsync(
            {
                firstName: "Elon",
                lastName: "Musk",
                jobTitleId: 1,
                roleId: UserRoleEnum.supervisorId,
                email: "elon.musk@email.com",
            },
            2,
            false);

        log("User 2 token: " + it2);
    }

    private seedVideoQuestions = async () => {

        await this._ormConnectionService
            .getRepository(Question)
            .save([
                {
                    questionText: "Hogy lehet e legyegyszerűbben a munkalapon a X789654-es cellához jutni?",
                    videoId: 4,
                    showUpTimeSeconds: 101,
                    answers: [
                        {
                            text: "Odagörgetek!",
                        },
                        {
                            text: "A szerkesztőlécbe beírom, hogy X789654, majd entert nyomok."
                        },
                        {
                            text: "A név mezőbe (bal oldal) beírom, hogy X789654, majd entert nyomok.",
                            isCorrect: true
                        },
                        {
                            text: "Az A1 cellába beírom, hogy X789654, majd entert nyomok.",
                        }
                    ]
                },
                {
                    questionText: "Hogy érem el, hogy az Excel a Pí szám 15 számjegyű értékével számoljon?",

                    videoId: 8,
                    showUpTimeSeconds: 110,
                    answers: [
                        {
                            text: "A számításban a \"Pi()\"-t használom.",
                            isCorrect: true
                        },
                        {
                            text: "A szerkesztőlécen a számításban a \"Pi()\"-t használom.",
                            isCorrect: true
                        },
                        {
                            text: "A Pi-t használom."
                        },
                        {
                            text: "3,141592653589"
                        }
                    ]
                },
                {
                    questionText: "What are some random fun facts about you?",

                    videoId: 1,
                    showUpTimeSeconds: 250,
                    answers: [
                        {
                            text: "Video answer 1"
                        },
                        {
                            text: "Video answer 2",
                            isCorrect: true
                        },
                        {
                            text: "Video answer 3"
                        }
                    ]
                },
                {
                    questionText: "What's Something You Want to Learn or Wish You Were Better At?",

                    videoId: 1,
                    showUpTimeSeconds: 400,
                    answers: [
                        {
                            text: "Video answer 1"
                        },
                        {
                            text: "Video answer 2"
                        },
                        {
                            text: "Video answer 3",
                            isCorrect: true
                        }
                    ]
                }
            ]);
    }

    private seedExamQuestions = async () => {

        await this._ormConnectionService
            .getRepository(Question)
            .save([

                // NEW EXAM 1
                {
                    questionText: "Exam question 1",
                    typeId: QuestionTypeEnum.multipleAnswers,
                    examId: 2,
                    answers: [
                        {
                            text: "Exam answer 1",
                            isCorrect: true
                        },
                        {
                            text: "Exam answer 2",
                            isCorrect: true
                        },
                        {
                            text: "Exam answer 3"
                        }
                    ]
                },
                {
                    questionText: "Exam question 2",

                    examId: 2,
                    showUpTimeSeconds: 250,
                    answers: [
                        {
                            text: "Exam answer 1"
                        },
                        {
                            text: "Exam answer 2",
                            isCorrect: true
                        },
                        {
                            text: "Exam answer 3"
                        }
                    ]
                },
                {
                    questionText: "Exam question 3",

                    examId: 2,
                    showUpTimeSeconds: 400,
                    answers: [
                        {
                            text: "Exam answer 1"
                        },
                        {
                            text: "Exam answer 2"
                        },
                        {
                            text: "Exam answer 3",
                            isCorrect: true
                        }
                    ]
                },

                // EXCEL FINAL EXAM
                {
                    questionText: "Excel filal exam / question 1?",
                    examId: 5,
                    answers: [
                        {
                            text: "Correct answer",
                            isCorrect: true
                        },
                        {
                            text: "Exam answer 2"
                        },
                        {
                            text: "Exam answer 3"
                        }
                    ]
                }
            ]);
    }
}
