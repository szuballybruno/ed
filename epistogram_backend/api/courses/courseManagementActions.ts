import {Request} from "express";
import {AdminPageEditVideoView} from "../../models/shared_models/AdminPageEditVideoDTO";
import {TagView} from "../../models/shared_models/TagDTO";
import {staticProvider} from "../../staticProvider";
import {User} from "../../models/entity/User";
import {Video} from "../../models/entity/Video";
import {toCourseItemDTO, toExamDTO, toPlayerDataDTO, toVideoDTO} from "../../services/mappings";
import {Exam} from "../../models/entity/Exam";
import {CourseShortDTO} from "../../models/shared_models/CourseShortDTO";
import {getReandomQuestion} from "../../services/questionService";
import {OverviewPageDTO} from "../../models/shared_models/OverviewPageDTO";
import {Course} from "../../models/entity/Course";
import {AdminPageEditCourseView} from "../../models/shared_models/AdminPageEditCourseDTO";
import {CourseItemDTO} from "../../models/shared_models/CourseItemDTO";
import {CourseItemType} from "../../models/shared_models/types/sharedTypes";
import {getPlayerDataAsync} from "../../services/playerService";
import {PlayerDataDTO} from "../../models/shared_models/PlayerDataDTO";
import {Organization} from "../../models/entity/Organization";
import {CourseOrganization} from "../../models/entity/CourseOrganization";
import {QuestionAnswer} from "../../models/entity/QuestionAnswer";
import {CourseOrganizationDTO} from "../../models/shared_models/CourseOrganizationDTO";
import {Group} from "../../models/entity/Group";

export const getVideoIdFromRequest = (req: Request) => {

    const videoId = req.body.videoId

    return !!videoId ? videoId : new Error("Cannot get videoId")
}

export const getCourseIdFromRequest = (req: Request) => {

    const courseId = req.body.courseId

    return !!courseId ? courseId : new Error("Cannot get courseId")
}

export const getEditedVideoAsync = async (videoId: string, ) => {

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
export const saveCourseOrganizationsAsync = async () => {
    // insert new answers
    const repo = staticProvider
        .ormConnection
        .getRepository(CourseOrganization);

    const courseOrganizationsSeed = [
        {
            courseId: 1,
            organizationId: 1,
            groupId: 1
        },{
            courseId: 1,
            organizationId: 2,
            groupId: 3
        }
    ] as CourseOrganizationDTO[]

    const courseOrganizations = courseOrganizationsSeed
        .map(x => ({
            courseId: x.courseId,
            organizationId: x.organizationId,
            groupId: x.groupId
        } as CourseOrganization))

    await repo.save(courseOrganizations);
}

export const getEditedCourseAsync = async (courseId: number) => {

    const organizations = await staticProvider
        .ormConnection
        .getRepository(Organization)
        .find()

    const groups = await staticProvider
        .ormConnection
        .getRepository(Group)
        .find()

    const courseOrganizations = await staticProvider
        .ormConnection
        .getRepository(CourseOrganization)
        .createQueryBuilder("co")
        .where("co.courseId = :courseId", { courseId })
        .leftJoinAndSelect("co.organization", "o")
        //.where("o.isSignupQuestion = true")
        .getMany()
    const courseGroups = await staticProvider
        .ormConnection
        .getRepository(CourseOrganization)
        .createQueryBuilder("co")
        .where("co.courseId = :courseId", { courseId })
        .leftJoinAndSelect("co.group", "g")
        //.where("o.isSignupQuestion = true")
        .getMany()

    const toOrganizationDTO = (courseOrganization: CourseOrganization[]) => {
        return courseOrganization.map((co) => {
            return {
                id: co.organization.id,
                name: co.organization.name
            }
        }) as Organization[]
    }

    const toGroupDTO = (courseOrganization: CourseOrganization[]) => {
        return courseOrganization.map((co) => {
            return {
                id: co.group.id,
                name: co.group.name
            }
        }) as Group[]
    }

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("course")
        .where("course.id = :courseId", {courseId: courseId})
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .getOneOrFail();

    const courseItems = toEditCourseItemsDTO(course)


    const AdminPageEditCourseDTO = {
        courseId: course.id,
        title: course.title,
        category: course.category,
        courseGroup: course.courseGroup,
        permissionLevel: course.permissionLevel,
        colorOne: course.colorOne,
        colorTwo: course.colorTwo,
        courseOrganizations: toOrganizationDTO(courseOrganizations),
        allOrganizations: organizations,
        courseGroups: toGroupDTO(courseGroups),
        allGroups: groups,
        courseItems: courseItems
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