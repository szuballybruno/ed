import { Request } from "express";
import { Course } from "../../models/entity/Course";
import { Exam } from "../../models/entity/Exam";
import { Video } from "../../models/entity/Video";
import { AdminPageEditCourseView } from "../../models/shared_models/AdminPageEditCourseDTO";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { toCourseItemDTO } from "../../services/mappings";
import { staticProvider } from "../../staticProvider";

export const getVideoIdFromRequest = (req: Request) => {

    const videoId = req.body.videoId

    return !!videoId ? videoId : new Error("Cannot get videoId")
}

export const getCourseIdFromRequest = (req: Request) => {

    const courseId = req.body.courseId

    return !!courseId ? courseId : new Error("Cannot get courseId")
}

export const getEditedVideoAsync = async (videoId: string,) => {

    /*const { aggregateAsync } = await useCollection("videos");*/

    const aggregateEditedVideoByVideoId = async () => {

        /*const AdminPageEditedVideo = await aggregateAsync([{
            '$match': {
                '_id': {$toObjectId: videoId}
            }
        },{
            '$project': {
                'editedVideoId': 'string',
                'editedVideoTitle': 'string',
                'editedVideoSubTitle': 'string',
                'editedVideoURL': 'string',
                'editedVideoDescription': 'string',
                'editedVideoThumbnailURL': 'string',
                'editedVideoTags': 'TagView',
                'allTags': 'TagView',
            }
        }])

        return AdminPageEditedVideo as AdminPageEditVideoView[];*/
    }

    return aggregateEditedVideoByVideoId()
}

const toEditCourseItemsDTO = (course: Course) => {

    const examItems = course
        .exams
        .map(x => toCourseItemDTO(x, false));

    const videoItems = course
        .videos
        .map(x => toCourseItemDTO(x, true));

    const itemsCombined = examItems
        .concat(videoItems);

    const itemsOrdered = itemsCombined
        .orderBy(x => x.orderIndex);

    return itemsOrdered as CourseItemDTO[];
}


const getCurrentCourseItem = async (courseItemId: number, courseItemType: CourseItemType) => {
    if (courseItemType == "video") {

        // get player data
        const video = await staticProvider
            .ormConnection
            .getRepository(Video)
            .findOneOrFail(courseItemId);

        return video;
    }
    else {

        // get player data
        const exam = await staticProvider
            .ormConnection
            .getRepository(Exam)
            .findOneOrFail(courseItemId);

        return exam;
    }
}

export const getEditedCourseAsync = async (courseId: number) => {



    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("course")
        .where("course.id = :courseId", { courseId: courseId })
        //.leftJoinAndSelect("course.tags", "tags")
        //.leftJoinAndSelect("user.currentVideo", "video")
        //.leftJoinAndSelect("user.currentExam", "exam")
        .leftJoinAndSelect("course.organization", "organization")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .getOneOrFail();

    const courseItems = toEditCourseItemsDTO(course)

    // const currentCourse = user.currentCourse;
    // const currentVideo = user.currentVideo;
    // const currentExam = user.currentExam;
    //
    // const videoDTOs = currentCourse
    //     ?.videos
    //     ?.map((course: Video) => toVideoDTO(course));
    //
    // const examDTOs = currentCourse
    //     ?.videos
    //     ?.map((course: Exam) => toExamDTO(course));
    //
    // const recommendedCourseDTOs = [] as CourseShortDTO[];
    // const randomQuestion = getReandomQuestion();
    // const currntTasks = getCurrentTasks();
    // const developmentChartData = getDevelopmentChart();

    const AdminPageEditCourseDTO = {
        courseId: course.id,
        title: course.title,
        category: course.category,
        courseGroup: course.courseGroup,
        permissionLevel: course.permissionLevel,
        colorOne: course.colorOne,
        colorTwo: course.colorTwo,
        courseOrganizations: [course.organization],
        allOrganizations: [{
            id: ""
        }],
        /*courseTags: [{
            id: course.tags.id
        }]*/
        courseItems: courseItems
        // tipOfTheDay: tipOfTheDay,
        // currentCourseId: currentCourse?.id ?? null,
        //
        // currentCourseVideos: videoDTOs ?? null,
        // currentCourseExams: examDTOs ?? null,
        //
        //currentCourseVideo: currentVideo ? toVideoDTO(currentVideo) : null,
        // currentCourseExam: currentExam ? toExamDTO(currentExam) : null,
        //
        // recommendedCourses: recommendedCourseDTOs,
        // testQuestionDTO: randomQuestion,
        // currentTasks: currntTasks,
        // developmentChartData: developmentChartData
    } as unknown as AdminPageEditCourseView;

    return AdminPageEditCourseDTO;
}

export const getEditedVideoAction = async (req: Request) => {
    //needs a getVideoIdFromRequest
    const videoId = getVideoIdFromRequest(req);
    //needs a getEditedVideoAsync
    return await getEditedVideoAsync(videoId);
};

export const getEditedCourseAction = async (req: Request) => {
    //needs a getCourseIdFromRequest
    const videoId = getCourseIdFromRequest(req);
    //needs a getEditedVideoAsync
    return await getEditedCourseAsync(videoId);
};