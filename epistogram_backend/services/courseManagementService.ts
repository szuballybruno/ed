import { Course } from "../models/entity/Course";
import { CourseOrganization } from "../models/entity/CourseOrganization";
import { Group } from "../models/entity/Group";
import { Organization } from "../models/entity/Organization";
import { Tag } from "../models/entity/Tag";
import {
    AdminPageEditCourseDTO,
    EditListItemDTO
} from "../models/shared_models/AdminPageEditCourseDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { staticProvider } from "../staticProvider";
import { toEditCourseItemsDTO, toUserDTO } from "./mappings";
import { getTeacherDTOAsync } from "./userService";
import {getAssetUrl} from "./misc/urlProvider";

export const getEditedVideoAsync = async (videoId: string) => {
    // TODO: Create a method to get the currently edited video by videoId
}

export const setEditedCourseAsync = async (courseId: number, courseData: AdminPageEditCourseDTO) => {
    const getCourseFromDTOAsync = async (courseData: AdminPageEditCourseDTO) => {
        return {
            id: courseData.courseId,
            title: courseData.title,
            category: courseData.category,
            courseGroup: courseData.courseGroup,
            permissionLevel: courseData.permissionLevel,
            colorOne: courseData.colorOne,
            colorTwo: courseData.colorTwo
            // courseOrganizations: organizatcourseData.courseOrganizations,
            // videos: courseData.videos,
            // exams: courseData.exams,
            // teacherId: courseData.teacherId,
            // teacher: courseData.teacher,
        } as Course
    }
    const course = await getCourseFromDTOAsync(courseData)
    const setCourse = await staticProvider
        .ormConnection
        .createQueryBuilder()
        .update(Course)
        .set(course)
        .where("course.id = :courseId", { courseId: courseId })
        .execute();
    return setCourse
}

export const getEditedCourseAsync = async (courseId: number) => {

    const organizations = await getOrganizationAsync();
    const teachers = await getTeacherDTOAsync();
    const groups = await getGroupAsync();
    const tags = await getTagsAsync();

    const courseOrganizations = await staticProvider
        .ormConnection
        .getRepository(CourseOrganization)
        .createQueryBuilder("co")
        .where("co.courseId = :courseId", { courseId })
        .leftJoinAndSelect("co.tag", "t")
        .leftJoinAndSelect("co.group", "g")
        .leftJoinAndSelect("co.organization", "o")
        .getMany();

    const assignedOrganizations = courseOrganizations.map(co => co.organization)
    const assignedGroups = courseOrganizations.map(co => co.group)
    const assignedTags = courseOrganizations.map(co => co.tag)

    const course = await staticProvider
        .ormConnection
        .getRepository(Course)
        .createQueryBuilder("course")
        .where("course.id = :courseId", { courseId: courseId })
        .leftJoinAndSelect("course.coverFile", "cf")
        .leftJoinAndSelect("course.teacher", "teacher")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .getOneOrFail();

    //const thumbnailImageURL = staticProvider.globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`;

    const thumbnailImageURL = course.coverFile
        ? getAssetUrl(course.coverFile.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    const courseItems = toEditCourseItemsDTO(course)
    const courseTeacher = toUserDTO(course.teacher);
    const courseOrganizationsChecked = createCheckedById(organizations, assignedOrganizations)
    const courseGroupsChecked = createCheckedById(groups, assignedGroups)
    const courseTagsChecked = createCheckedById(tags, assignedTags)
    const courseTeachersChecked = createCheckedById(teachers, [courseTeacher]);

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        courseGroup: course.courseGroup,
        permissionLevel: course.permissionLevel,
        thumbnailURL: thumbnailImageURL,
        colorOne: course.colorOne,
        colorTwo: course.colorTwo,
        courseItems: courseItems,
        organizations: courseOrganizationsChecked,
        groups: courseGroupsChecked,
        teachers: courseTeachersChecked,
        tags: courseTagsChecked,
    } as AdminPageEditCourseDTO;
}

const getOrganizationAsync = async () => {

    const organizations = await staticProvider
        .ormConnection
        .getRepository(Organization)
        .find()

    return organizations;
}

const getGroupAsync = async () => {

    const groups = await staticProvider
        .ormConnection
        .getRepository(Group)
        .find()

    return groups;
}

const getTagsAsync = async () => {

    const tags = await staticProvider
        .ormConnection
        .getRepository(Tag)
        .find()

    return tags;
}

const createCheckedById = <T extends UserDTO | Organization | Group | Tag>(
    allEntities: T[],
    assignedEntities: T[]) => {

    return allEntities
        .map((item, index) => {

            const isChecked = assignedEntities
                .some(checkedItem => checkedItem.id === item.id);

            const listItem = {
                checked: isChecked,
                id: item.id,
                name: item.name
            } as EditListItemDTO;

            return listItem;
        });
};