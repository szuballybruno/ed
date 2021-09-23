import { createDatabase, dropDatabase } from "typeorm-extension";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { TypeORMConnection } from "../database";
import { Course } from "../models/entity/Course";
import { CourseGroup } from "../models/entity/CourseGroup";
import { CourseOrganization } from "../models/entity/CourseOrganization";
import { CourseTag } from "../models/entity/CourseTag";
import { Exam } from "../models/entity/Exam";
import { Group } from "../models/entity/Group";
import { Organization } from "../models/entity/Organization";
import { Question } from "../models/entity/Question";
import { StorageFile } from "../models/entity/StorageFile";
import { Tag } from "../models/entity/Tag";
import { Role } from "../models/entity/Role";
import { Video } from "../models/entity/Video";
import { CourseGroupDTO } from "../models/shared_models/CourseGroupDTO";
import { CourseOrganizationDTO } from "../models/shared_models/CourseOrganizationDTO";
import { CourseTagDTO } from "../models/shared_models/CourseTagDTO";
import { UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { log } from "./misc/logger";
import { executeSeedScriptAsync } from "./rawSqlService";
import { createInvitedUserWithOrgAsync, finalizeUserRegistrationAsync } from "./signupService";
import { setUserAvatarFileId } from "./userService";
import { insertVideoAsync } from "./videoService";
import { Activity } from "../models/entity/Activity";

export const recreateDB = async (postgresOptions: ConnectionOptions) => {

    log("Dropping databasea...");
    await dropDatabase({ ifExist: true }, postgresOptions);

    log("Creating database...");
    await createDatabase({ ifNotExist: true, characterSet: "UTF8" }, postgresOptions);
}

export const seedDB = async () => {

    const connection = staticProvider.ormConnection;

    log("seedOrganizations");
    const orgIds = await seedOrganizations(connection);

    log("seedActivities");
    await seedActivities(connection);

    log("seedUserRoles");
    await seedRoles(connection);

    log("seedSignupExam");
    await seedSignupExam(connection);

    log("seedUsers")
    await seedUsers(connection, orgIds);

    await executeSeedScriptAsync("seedSignupQuestions");

    await executeSeedScriptAsync("seedPersonalityCategoryDescriptions");

    log("seedTags")
    await seedTags(connection);

    log("seedGroups")
    await seedGroups(connection, orgIds);

    log("seedCourses")
    await seedCourses(connection);

    log("seedVideos")
    await seedVideos(connection);

    log("seedVideoQuestions")
    await seedVideoQuestions(connection);

    log("seedExamQuestions")
    await seedExamQuestions(connection);

    log("seedFiles")
    await seedFiles(connection);

    log("seedCourseOrganizationsAsync")
    await seedCourseOrganizationsAsync();

    log("seedCourseGroupsAsync")
    await seedCourseGroupsAsync();

    log("seedCourseTagsAsync")
    await seedCourseTagsAsync();
}

const seedOrganizations = async (connection: TypeORMConnection) => {

    return (await connection
        .getRepository(Organization)
        .insert([
            {
                name: "Farewell Kft."
            },
            {
                name: "Bruno Muvek"
            },
            {
                name: "Manfredisztan.org"
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
        .getRepository(Exam)
        .insert({
            title: "Signup exam",
        });
}

const seedCourses = async (connection: TypeORMConnection) => {

    await connection
        .getRepository(Course)
        .save([

            // course: 1
            {
                title: "Webfejlesztés kezdőknek (HTML, CSS, BOOTSTRAP)",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/1.png"
                },
                exams: [
                    {
                        title: "New Exam 1",
                        subtitle: "Fantastic exam 1",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 1
                    },
                    {
                        title: "New Exam 2",
                        subtitle: "Fantastic exam 2",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 3
                    },
                    {
                        title: "New Exam 3",
                        subtitle: "Fantastic exam 3",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 4,
                        isFinalExam: true
                    }
                ]
            } as Course,

            // course: 2
            {
                title: "Java programozás mesterkurzus",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/2.png"
                },
            },

            // course: 3
            {
                title: "Angular - Minden amire szükséged lehet",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/3.png"
                },
            },

            // course: 4
            {
                title: "Microsoft Excel Mesterkurzus",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/4.png"
                },
                exams: [
                    {
                        title: "Excel Final Exam",
                        subtitle: "Excel Final Exam",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 4,
                        isFinalExam: true
                    }
                ]
            },

            // etc
            {
                title: "DevOps kezdőknek - Kubernetes",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/5.png"
                },
            },
            {
                title: "Google classroom használata",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/7.png"
                },
            },
            {
                title: "Válj szuper tanulóvá - Gyorsolvasás és tanulás fejlesztés",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
            },
            {
                title: "Tanulj meg elkészíteni bármilyen karaktert - Adobe Illustrator",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/6.png"
                },
            },
            {
                title: "Google Ads Mesterkurzus",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                teacherId: 1,
                coverFile: {
                    pending: false,
                    filePath: "/courseCoverImages/8.png"
                },
            }
        ] as Course[]);
}

const seedVideos = async (connection: TypeORMConnection) => {

    // course 1 videos
    await insertVideoAsync({
        courseId: 1,
        title: "Ben Awad Rant 1/1",
        subtitle: "Fantastic Video 1",
        description: "Very very fantastic video 1 description",
        orderIndex: 0
    } as Video, "videos/video_1.mp4");

    await insertVideoAsync({
        courseId: 1,
        title: "Video 1/2",
        subtitle: "Fantastic Video 2",
        description: "Very very fantastic video 2 description",
        orderIndex: 2
    } as Video, null);

    // course 4 videos
    await insertVideoAsync({
        courseId: 4,
        title: "Egyszerűbb számítások",
        subtitle: "Alapvető műveletek Excelben",
        description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
        orderIndex: 0,
    } as Video, "videos/video_2.mp4");

    await insertVideoAsync({
        courseId: 4,
        title: "Cellák és területek azonosítása",
        subtitle: "Alapvető műveletek Excelben",
        description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
        orderIndex: 1,
    } as Video, "videos/video_3.m4v");

    await insertVideoAsync({
        courseId: 4,
        title: "Adatbevitel, javítás I.",
        subtitle: "Alapvető műveletek Excelben",
        description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
        orderIndex: 2,
    } as Video, "videos/video_4.m4v");

    await insertVideoAsync({
        courseId: 4,
        title: "Adatbevitel, javítás II.",
        subtitle: "Alapvető műveletek Excelben",
        description: "Az Excellel számolhatunk, és nem csak táblázatot vihetünk fel rá, hanem a számításokkal a táblázat értékeit módosíthatjuk, illetve aktuálisan tarthatjuk.",
        orderIndex: 3,
    } as Video, "videos/video_5.m4v");
}

const seedUsers = async (connection: TypeORMConnection, orgIds: number[]) => {

    log("seeding User 1...")
    const { invitationToken, user } = await createInvitedUserWithOrgAsync(
        {
            firstName: "Endre",
            lastName: "Marosi",
            jobTitle: "IT Manager",
            roleId: UserRoleEnum.administratorId,
            email: "marosi.endre@email.com",
        },
        orgIds[0],
        false);

    await finalizeUserRegistrationAsync({
        invitationToken: invitationToken,
        phoneNumber: "+36 202020202",
        password: "admin",
        controlPassword: "admin"
    });

    log("seeding User 2...")
    const { invitationToken: it2, user: u2 } = await createInvitedUserWithOrgAsync(
        {
            firstName: "Elon",
            lastName: "Musk",
            jobTitle: "Tech God",
            roleId: UserRoleEnum.supervisorId,
            email: "elon.musk@email.com",
        },
        orgIds[0],
        false);

    log("User 2 token: " + it2);
}

const seedFiles = async (connection: TypeORMConnection) => {

    const fileRepo = await connection
        .getRepository(StorageFile);

    // video 1 file
    // const file = {
    //     pending: false,
    //     filePath: "videos/video_1.mp4",
    // } as StorageFile;

    // await fileRepo.insert(file);

    // await setVideoFileIdAsync(1, file.id);

    // user avatar 1 file 
    const avatarFile = {
        pending: false,
        filePath: "userAvatars/user_avatar_1.png"
    } as StorageFile;

    await fileRepo.insert(avatarFile);

    await setUserAvatarFileId(1, avatarFile.id);
}

const seedVideoQuestions = async (connection: TypeORMConnection) => {

    await connection
        .getRepository(Question)
        .save([
            {
                questionText: "What Makes You Unique?",

                videoId: 3,
                showUpTimeSeconds: 150,
                answers: [
                    {
                        text: "Correct answer!",
                        isCorrect: true
                    },
                    {
                        text: "Incorrect answer 1."
                    },
                    {
                        text: "Incorrect answer 2."
                    }
                ]
            },
            {
                questionText: "What Makes You Unique?",

                videoId: 1,
                showUpTimeSeconds: 150,
                answers: [
                    {
                        text: "Video answer 1",
                        isCorrect: true
                    },
                    {
                        text: "Video answer 2"
                    },
                    {
                        text: "Video answer 3"
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

                examId: 2,
                answers: [
                    {
                        text: "Exam answer 1",
                        isCorrect: true
                    },
                    {
                        text: "Exam answer 2"
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

const seedCourseOrganizationsAsync = async () => {

    // insert new answers
    const repo = staticProvider
        .ormConnection
        .getRepository(CourseOrganization);

    const courseOrganizationsSeed = [
        {
            courseId: 1,
            organizationId: 1,
        }, {
            courseId: 1,
            organizationId: 2,
        }
    ] as CourseOrganizationDTO[]

    const courseOrganizations = courseOrganizationsSeed
        .map(x => ({
            courseId: x.courseId,
            organizationId: x.organizationId,
        } as CourseOrganizationDTO))

    await repo.save(courseOrganizations);
}

const seedCourseGroupsAsync = async () => {

    // insert new answers
    const repo = staticProvider
        .ormConnection
        .getRepository(CourseGroup);

    const courseGroupsSeed = [
        {
            courseId: 1,
            groupId: 1,
        }, {
            courseId: 1,
            groupId: 3,
        }
    ] as CourseGroupDTO[]

    const courseGroups = courseGroupsSeed
        .map(x => ({
            courseId: x.courseId,
            groupId: x.groupId,
        } as CourseGroupDTO))

    await repo.save(courseGroups);
}

const seedCourseTagsAsync = async () => {

    // insert new answers
    const repo = staticProvider
        .ormConnection
        .getRepository(CourseTag);

    const courseTagsSeed = [
        {
            courseId: 1,
            tagId: 1,
        }, {
            courseId: 1,
            tagId: 2,
        }
    ] as CourseTagDTO[]

    const courseTags = courseTagsSeed
        .map(x => ({
            courseId: x.courseId,
            tagId: x.tagId,
        } as CourseTagDTO))

    await repo.save(courseTags);
}

const seedTags = (connection: TypeORMConnection) => {

    return connection
        .getRepository(Tag)
        .save([
            {
                name: "design",
            },
            {
                name: "marketing",
            },
            {
                name: "development",
            }
        ])
}

const seedGroups = (connection: TypeORMConnection, orgIds: number[]) => {

    return connection
        .getRepository(Group)
        .save([
            {
                name: "Hegesztők",
                organizationId: orgIds[0]
            },
            {
                name: "Takarítók",
                organizationId: orgIds[0]
            },
            {
                name: "Műszerészek",
                organizationId: orgIds[1]
            }
        ])
}