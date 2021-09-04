import {Request} from "express";
import {staticProvider} from "../staticProvider";
import {User} from "../models/entity/User";
import {Video} from "../models/entity/Video";
import {
    toCourseItemDTO,
    toEditListItemDTO,
} from "./mappings";
import {Exam} from "../models/entity/Exam";
import {Course} from "../models/entity/Course";
import {AdminPageEditCourseView} from "../models/shared_models/AdminPageEditCourseDTO";
import {CourseItemDTO} from "../models/shared_models/CourseItemDTO";
import {CourseItemType} from "../models/shared_models/types/sharedTypes";
import {Organization} from "../models/entity/Organization";
import {CourseOrganization} from "../models/entity/CourseOrganization";
import {CourseOrganizationDTO} from "../models/shared_models/CourseOrganizationDTO";
import {Group} from "../models/entity/Group";
import {Tag} from "../models/entity/Tag";

export const getVideoIdFromRequest = (req: Request) => {

    const videoId = req.body.videoId

    return !!videoId ? videoId : new Error("Cannot get videoId")
}

export const getCourseIdFromRequest = (req: Request) => {

    const courseId = req.body.courseId

    return !!courseId ? courseId : new Error("Cannot get courseId")
}

export const getEditedVideoAsync = async (videoId: string) => {
    // TODO: Create a method to get the currently edited video by videoId
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
            groupId: 1,
            tagId: 1
        },{
            courseId: 1,
            organizationId: 2,
            groupId: 3,
            tagId: 1
        },{
            courseId: 1,
            organizationId: 2,
            groupId: 3,
            tagId: 2
        }
    ] as CourseOrganizationDTO[]

    const courseOrganizations = courseOrganizationsSeed
        .map(x => ({
            courseId: x.courseId,
            organizationId: x.organizationId,
            groupId: x.groupId,
            tagId: x.tagId
        } as CourseOrganizationDTO))

    await repo.save(courseOrganizations);
}

export const getEditedCourseAsync = async (courseId: number) => {

    const createCheckedById = function (propToBeComparedBy: string, allItems: any[], checkedItems: any[]) {
        let a = allItems
        a.map((item, index) => {
            if (checkedItems.some(value => value[propToBeComparedBy] === item[propToBeComparedBy])) {
                return [...a, a[index].checked = true]
            } else {
                return [...a, a[index].checked = false]
            }
        })
        return a
    };

    const courseOrganizations = await staticProvider
        .ormConnection
        .getRepository(CourseOrganization)
        .createQueryBuilder("co")
        .where("co.courseId = :courseId", {courseId})
        .leftJoinAndSelect("co.tag", "t")
        .leftJoinAndSelect("co.group", "g")
        .leftJoinAndSelect("co.organization", "o")
        .getMany()

    const organizations = await staticProvider
        .ormConnection
        .getRepository(Organization)
        .find()

    const groups = await staticProvider
        .ormConnection
        .getRepository(Group)
        .find()

    const teachers = await staticProvider
        .ormConnection
        .getRepository(User)
        .find()

    const tags = await staticProvider
        .ormConnection
        .getRepository(Tag)
        .find()

    const filteredOrganizations = courseOrganizations.map(co => co.organization)
    const filteredGroups = courseOrganizations.map(co => co.group)
    const filteredTags = courseOrganizations.map(co => co.tag)

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("course")
        .where("course.id = :courseId", {courseId: courseId})
        .leftJoinAndSelect("course.teacher", "teacher")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .getOneOrFail();

    const courseItems = toEditCourseItemsDTO(course)
    const courseTeacher = course.teacher

    const courseOrganizationsChecked = createCheckedById("id", organizations, filteredOrganizations)
    const courseGroupsChecked = createCheckedById("id", groups, filteredGroups)
    const courseTagsChecked = createCheckedById("id", tags, filteredTags)
    const courseTeachersChecked = createCheckedById("id", teachers, new Array(courseTeacher))

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        courseGroup: course.courseGroup,
        permissionLevel: course.permissionLevel,
        colorOne: course.colorOne,
        colorTwo: course.colorTwo,

        courseItems: courseItems,

        organizations: courseOrganizationsChecked.map(organization =>
            toEditListItemDTO(
                organization.id,
                organization.name,
                organization.checked)),

        groups: courseGroupsChecked.map(group =>
            toEditListItemDTO(
                group.id,
                group.name,
                group.checked)),

        teachers: courseTeachersChecked.map(teacher => {
            const teacherFullName = `${teacher.lastName} ${teacher.firstName}`;

            return toEditListItemDTO(
                teacher.id,
                teacherFullName,
                teacher.checked);
        }),

        tags: courseTagsChecked.map(tag =>
            toEditListItemDTO(
                tag.id,
                tag.name,
                tag.checked)),
    } as AdminPageEditCourseView;
}

export const getEditedVideoAction = async (req: Request) => {

    const videoId = getVideoIdFromRequest(req);

    return await getEditedVideoAsync(videoId);
};

export const getEditedCourseAction = async (req: Request) => {
    //needs a getCourseIdFromRequest
    const videoId = getCourseIdFromRequest(req);
    //needs a getEditedVideoAsync
    return await getEditedCourseAsync(videoId);
};