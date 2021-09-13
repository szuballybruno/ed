import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { Answer } from "./models/entity/Answer";
import { AnswerSession } from "./models/entity/AnswerSession";
import { Course } from "./models/entity/Course";
import { CourseGroup } from "./models/entity/CourseGroup";
import { CourseOrganization } from "./models/entity/CourseOrganization";
import { CourseTag } from "./models/entity/CourseTag";
import { Exam } from "./models/entity/Exam";
import { Group } from "./models/entity/Group";
import { Organization } from "./models/entity/Organization";
import { Question } from "./models/entity/Question";
import { QuestionAnswer } from "./models/entity/QuestionAnswer";
import { StorageFile } from "./models/entity/StorageFile";
import { Tag } from "./models/entity/Tag";
import { Task } from "./models/entity/Task";
import { TestChild } from "./models/entity/TestChild";
import { TestParent } from "./models/entity/TestParent";
import { TestSubChild } from "./models/entity/TestSubChild";
import { User } from "./models/entity/User";
import { Video } from "./models/entity/Video";
import { VideoPlaybackData } from "./models/entity/VideoPlaybackData";
import { VideoPlaybackSample } from "./models/entity/VideoPlaybackSample";
import { CourseGroupDTO } from "./models/shared_models/CourseGroupDTO";
import { CourseOrganizationDTO } from "./models/shared_models/CourseOrganizationDTO";
import { CourseTagDTO } from "./models/shared_models/CourseTagDTO";
import { RoleType } from "./models/shared_models/types/sharedTypes";
import { log } from "./services/misc/logger";
import { getAssetUrl } from "./services/misc/urlProvider";
import { createInvitedUserWithOrgAsync, finalizeUserRegistrationAsync } from "./services/signupService";
import { setUserAvatarFileId } from "./services/userService";
import { insertVideoAsync } from "./services/videoService";
import { staticProvider } from "./staticProvider";
import { UserVideoCompletedView } from "./models/entity/views/UserVideoCompletedView";
import { UserExamCompletedView } from "./models/entity/views/UserExamCompletedView";
import { UserExamAnswerSessionView } from "./models/entity/views/UserExamAnswerSessionView";
import { UserVideoMaxWatchedSecondsView } from "./models/entity/views/UserVideoMaxWatchedSecondsView";
import { UserCourseBridge } from "./models/entity/UserCourseBridge";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async (recreate: boolean) => {

    const host = staticProvider.globalConfig.database.hostAddress;
    const port = staticProvider.globalConfig.database.port;
    const username = staticProvider.globalConfig.database.serviceUserName;
    const password = staticProvider.globalConfig.database.serviceUserPassword;
    const databaseName = staticProvider.globalConfig.database.name;
    const isSyncEnabled = staticProvider.globalConfig.database.isOrmSyncEnabled;
    const isLoggingEnabled = staticProvider.globalConfig.database.isOrmLoggingEnabled;

    const postgresOptions = {
        type: "postgres",
        port: port,
        host: host,
        username: username,
        password: password,
        database: databaseName,
        synchronize: isSyncEnabled,
        logging: isLoggingEnabled,
        entities: [
            // "models/entity/**/*.ts"
            Course,
            CourseOrganization,
            CourseGroup,
            CourseTag,
            Exam,
            Group,
            Organization,
            User,
            Video,
            Task,
            QuestionAnswer,
            Question,
            Answer,
            Tag,
            TestChild,
            TestParent,
            TestSubChild,
            StorageFile,
            AnswerSession,
            VideoPlaybackSample,
            VideoPlaybackData,
            UserCourseBridge,

            // views
            UserVideoCompletedView,
            UserExamCompletedView,
            UserExamAnswerSessionView,
            UserVideoMaxWatchedSecondsView
        ],
    } as ConnectionOptions;

    log("Database connection options:");
    log(postgresOptions);

    if (recreate) {

        log("Recreating DB...");
        await recreateDB(postgresOptions);
    }

    log("Connecting to database with TypeORM...");
    staticProvider.ormConnection = await createTypeORMConnection(postgresOptions);

    // seed DB if no users are found
    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    if (users.length < 1) {

        log("Seeding DB...");
        await seedDB();
    }
}

const createTypeORMConnection = (opt: ConnectionOptions) => {

    try {

        return createConnection(opt);
    }
    catch (e) {

        throw new Error("Type ORM connection error!" + e);
    }
}

export const recreateDB = async (postgresOptions: ConnectionOptions) => {

    log("Dropping databasea...");
    await dropDatabase({ ifExist: true }, postgresOptions);

    log("Creating database...");
    await createDatabase({ ifNotExist: true, characterSet: "UTF8" }, postgresOptions);
}

export const seedDB = async () => {

    const connection = staticProvider.ormConnection;
    const orgIds = await seedOrganizations(connection);

    log("seedUsers")
    await seedUsers(connection, orgIds);

    log("seedSignupQuestions")
    await seedSignupQuestions(connection);

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
                        orderIndex: 4
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
                }
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

    const { invitationToken, user } = await createInvitedUserWithOrgAsync(
        {
            firstName: "Endre",
            lastName: "Marosi",
            jobTitle: "IT Manager",
            role: "admin" as RoleType,
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
}

const seedSignupQuestions = async (connection: TypeORMConnection) => {

    const questions = [
        {
            isSignupQuestion: true,
            questionText: "Egy csapatban elvégzendő projekt esetén a következőt preferálom:",
            imageUrl: getAssetUrl("/application/kerdes1.png"),
            answers: [
                {
                    text: "Szoros együttműködés a többiekkel"
                },
                {
                    text: "Szívesebben oldok meg egyedül részfeladatokat"
                },
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ",
            imageUrl: getAssetUrl("/application/kerdes2.png"),
            answers: [
                {
                    text: "Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt",
                },
                {
                    text: "Mondja el/írja le, hogy mikor merre kell fordulnom",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Jobban preferálom azt a munkában, mikor:",
            imageUrl: getAssetUrl("/application/kerdes3.png"),
            answers: [
                {
                    text: "Előre definiált instrukciók alapján végzek el feladatokat",
                },
                {
                    text: "Kutatnom kell a megoldás után és analizálni különböző eseteket",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Egy előadás esetén hasznosabb számomra, ha:",
            imageUrl: getAssetUrl("/application/kerdes4.png"),
            answers: [
                {
                    text: "Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket",
                },
                {
                    text: "kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben:",
            imageUrl: getAssetUrl("/application/kerdes5.png"),
            answers: [
                {
                    text: "Zenéken, írásokon, a művészet által",
                },
                {
                    text: "Direkt, lényegre törő kommunikációval",
                }
            ]
        }
    ] as Question[]

    await connection
        .getRepository(Question)
        .save(questions);
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
                isSignupQuestion: false,
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
                isSignupQuestion: false,
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
                isSignupQuestion: false,
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
                isSignupQuestion: false,
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
            {
                questionText: "Exam question 1",
                isSignupQuestion: false,
                examId: 1,
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
                isSignupQuestion: false,
                examId: 1,
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
                isSignupQuestion: false,
                examId: 1,
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