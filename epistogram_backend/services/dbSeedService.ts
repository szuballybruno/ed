import { TypeORMConnection } from "../database";
import { Activity } from "../models/entity/Activity";
import { Course } from "../models/entity/Course";
import { CourseCategory } from "../models/entity/CourseCategory";
import { CourseModule } from "../models/entity/CourseModule";
import { Exam } from "../models/entity/Exam";
import { Organization } from "../models/entity/Organization";
import { Question } from "../models/entity/Question";
import { Role } from "../models/entity/Role";
import { Video } from "../models/entity/Video";
import { QuestionTypeEnum, UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { registerInvitedUserAsync } from "./dataService";
import { log } from "./misc/logger";
import { createInvitedUserWithOrgAsync } from "./signupService";
import { executeSeedScriptAsync } from "./sqlServices/sqlSeedScriptService";
import { insertVideoAsync } from "./videoService";

export const seedDB = async () => {

    const connection = staticProvider.ormConnection;

    log("seedOrganizations");
    const orgIds = await seedOrganizations(connection);

    log("seedQuestionTypes");
    await executeSeedScriptAsync("seedQuestionTypes");

    log("seedActivities");
    await seedActivities(connection);

    log("seedUserRoles");
    await seedRoles(connection);

    log("seedSignupExam");
    await seedSignupExam(connection);

    log("seedJobRoles")
    await executeSeedScriptAsync("seedJobRoles");

    log("seedUsers")
    await seedUsersAsync(connection, orgIds);

    log("seedSignupQuestions")
    await executeSeedScriptAsync("seedSignupQuestions");

    log("seedPersonalityCategoryDescriptions")
    await executeSeedScriptAsync("seedPersonalityCategoryDescriptions");

    log("seedDailyTips")
    await executeSeedScriptAsync("seedDailyTips");

    log("seedCourseCategories")
    await seedCourseCategories(connection);

    log("seedCourses")
    await seedCourses(connection);

    log("seedVideos")
    await seedVideos(connection);

    log("seedVideoQuestions")
    await seedVideoQuestions(connection);

    log("seedExamQuestions")
    await seedExamQuestions(connection);
}

const seedOrganizations = async (connection: TypeORMConnection) => {

    return (await connection
        .getRepository(Organization)
        .insert([
            {
                name: "P029"
            },
            {
                name: "EpistoGram"
            }
        ]))
        .identifiers
        .map(x => x.id as number);
}

const seedActivities = async (connection: TypeORMConnection) => {

    await connection
        .getRepository(Activity)
        .save([
            {
                name: "canSetInvitedUserOrganization"
            },
            {
                name: "canAccessCourseAdministration"
            },
            {
                name: "canAccessAdministration"
            },
            {
                name: "canAccessApplication"
            }
        ]);
}

const seedRoles = async (connection: TypeORMConnection) => {

    await connection
        .getRepository(Role)
        .save([
            {
                name: "Administrator"
            },
            {
                name: "Supervisor",
                roleActivityBridges: [
                    {
                        activityId: 3
                    }
                ]
            },
            {
                name: "User"
            }
        ] as Role[]);
}

const seedSignupExam = async (connection: TypeORMConnection) => {

    await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .insert({
            name: "Signup module exam",
            orderIndex: 0,
            description: "signup exam module"
        });

    await staticProvider
        .ormConnection
        .getRepository(Exam)
        .insert({
            title: "Signup exam",
            moduleId: 1
        });
}

const seedCourseCategories = async (connection: TypeORMConnection) => {

    await connection
        .getRepository(CourseCategory)
        .save([

            // id:1
            {
                name: "IT",
                childCategories: [

                    // id:2
                    {
                        name: "Hálózatok"
                    },

                    // id:3
                    {
                        name: "Szoftverfejlesztés"
                    },

                    // id:4
                    {
                        name: "E-Commerce"
                    },

                    // id:5
                    {
                        name: "Irodai alkalmazások"
                    },

                    // id:6
                    {
                        name: "Általános IT"
                    },

                    // id:7
                    {
                        name: "Biztonság"
                    },

                    // id:8
                    {
                        name: "Önfejlesztés"
                    },

                    // id:9
                    {
                        name: "Média"
                    },

                    // id:10
                    {
                        name: "Marketing"
                    }
                ]
            }
        ])
}

const seedCourses = async (connection: TypeORMConnection) => {

    // courses 
    await connection
        .getRepository(Course)
        .save([

            // course: 1
            {
                title: "Webfejlesztés kezdőknek (HTML, CSS, BOOTSTRAP)",
                categoryId: 1,
                subCategoryId: 2,
                teacherId: 1,
                coverFile: {
                    filePath: "/courseCoverImages/1.png"
                }
            } as Course,

            // course: 2
            {
                title: "Java programozás mesterkurzus",
                categoryId: 1,
                subCategoryId: 3,
                teacherId: 1,
                coverFile: {
                    filePath: "/courseCoverImages/2.png"
                }
            },

            // course: 3
            {
                title: "Angular - Minden amire szükséged lehet",
                categoryId: 1,
                subCategoryId: 4,
                teacherId: 1,
                coverFile: {
                    filePath: "/courseCoverImages/3.png"
                }
            },

            // course: 4
            {
                title: "Microsoft Excel Mesterkurzus",
                categoryId: 1,
                subCategoryId: 5,
                teacherId: 1,
                coverFile: {
                    filePath: "/courseCoverImages/4.png"
                }
            }
        ] as Course[]);

    // modules 
    await staticProvider
        .ormConnection
        .getRepository(CourseModule)
        .insert([
            {
                courseId: 1,
                name: "Első modul",
                orderIndex: 0,
                description: "desc"
            },
            {
                courseId: 2,
                name: "Module",
                orderIndex: 0,
                description: "desc"
            },
            {
                courseId: 3,
                name: "Module",
                orderIndex: 0,
                description: "desc"
            },
            {
                courseId: 4,
                name: "Első modul",
                orderIndex: 0,
                description: "desc"
            },
            {
                courseId: 4,
                name: "Masodik modul",
                orderIndex: 1,
                description: "desc"
            },
        ]);

    // exams 
    await staticProvider
        .ormConnection
        .getRepository(Exam)
        .insert([

            // course  2
            {
                courseId: 1,
                title: "New Exam 1",
                subtitle: "Fantastic exam 1",
                thumbnailUrl: "",
                description: "",
                orderIndex: 1,
                moduleId: 2
            },
            {
                courseId: 1,
                title: "New Exam 2",
                subtitle: "Fantastic exam 2",
                thumbnailUrl: "",
                description: "",
                orderIndex: 3,
                moduleId: 2
            },
            {
                courseId: 1,
                title: "New Exam 3",
                subtitle: "Fantastic exam 3",
                thumbnailUrl: "",
                description: "",
                orderIndex: 4,
                isFinalExam: true,
                moduleId: 2
            },

            // course 5
            {
                courseId: 4,
                title: "Excel Final Exam",
                subtitle: "Excel Final Exam",
                thumbnailUrl: "",
                description: "",
                orderIndex: 5,
                isFinalExam: true,
                moduleId: 6
            }
        ]);
}

const seedVideos = async (connection: TypeORMConnection) => {

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

const seedUsersAsync = async (connection: TypeORMConnection, orgIds: number[]) => {

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

const seedVideoQuestions = async (connection: TypeORMConnection) => {

    await connection
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

const seedExamQuestions = async (connection: TypeORMConnection) => {

    await connection
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
