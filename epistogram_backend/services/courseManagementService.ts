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
import {toCourseOrganizationDTO, toEditCourseItemsDTO, toUserDTO} from "./mappings";
import { getTeacherDTOAsync } from "./userService";
import {getAssetUrl} from "./misc/urlProvider";
import {CourseGroup} from "../models/entity/CourseGroup";
import {CourseTag} from "../models/entity/CourseTag";
import {CourseGroupDTO} from "../models/shared_models/CourseGroupDTO";

export const getEditedVideoAsync = async (videoId: string) => {
    // TODO: Create a method to get the currently edited video by videoId
}

export const setEditedCourseAsync = async (courseId: number, courseData: AdminPageEditCourseDTO) => {

    // Creating Course from AdminPageEditCourseDTO

    const getCourseFromDTOAsync = async (courseData: AdminPageEditCourseDTO) => {
        return {
            id: courseData.courseId,
            title: courseData.title,
            category: courseData.category,
            courseGroup: courseData.courseGroup,
            permissionLevel: courseData.permissionLevel,
            colorOne: courseData.colorOne,
            colorTwo: courseData.colorTwo
        } as Course
    }

    // Creating two list of ids from checked and unchecked groups

    const checkedGroupIds = courseData.groups.filter(group => group.checked).map(group => group.id) as Number[]
    const unCheckedGroupIds = courseData.groups.filter(group => !group.checked).map(group => group.id) as Number[]

    // Getting the existing groups from checkedGroupIds

    const checkedAndExistingGroups = await staticProvider
        .ormConnection
        .getRepository(Group)
        .createQueryBuilder("g")
        .whereInIds(checkedGroupIds)
        .getMany()

    // Getting the existing groups from unCheckedGroupIds

    const unCheckedAndExistingGroups = await staticProvider
        .ormConnection
        .getRepository(Group)
        .createQueryBuilder("g")
        .whereInIds(unCheckedGroupIds)
        .getMany()

    // Creating CourseGroupDTO-s from groups

    const createCourseGroupsFromGroups = async (arr: Group[]): Promise<CourseGroupDTO[]> => {
        return arr.map(group => {
            return {
                courseId: courseId,
                groupId: group.id
            }
        })
    }

    // Creating a list of checked and unchecked courseGroups

    const checkedCourseGroups = await createCourseGroupsFromGroups(checkedAndExistingGroups)
    const uncheckedCourseGroups = await createCourseGroupsFromGroups(unCheckedAndExistingGroups)

    const unCheckedGroupIdsThatShouldBeRemoved = uncheckedCourseGroups.map(cg => cg.groupId)

    // Inserting checked groups as courseGroups

    const insertIntoCourseGroup = async (arr: CourseGroupDTO[]) => {
        await staticProvider
            .ormConnection
            .createQueryBuilder()
            .insert()
            .into(CourseGroup)
            .values(arr)
            .orIgnore()
            .execute();
    }


    // Removing unchecked groups by ids

    const deleteFromCourseGroup = async (arr: number[]) => {
         if (arr.length !== 0) {
             await staticProvider
                 .ormConnection
                 .createQueryBuilder()
                 .delete()
                 .from(CourseGroup)
                 .where("groupId IN (:...ids)", { ids: arr })
                 .execute()
         }
    }

    await insertIntoCourseGroup(checkedCourseGroups)
    await deleteFromCourseGroup(unCheckedGroupIdsThatShouldBeRemoved)

    // Updating courses data

    const course = await getCourseFromDTOAsync(courseData)

    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .update(Course)
        .set(course)
        .where("course.id = :courseId", { courseId: courseId })
        .execute();
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
        .leftJoinAndSelect("co.organization", "o")
        .getMany();

    const courseGroups = await staticProvider
        .ormConnection
        .getRepository(CourseGroup)
        .createQueryBuilder("cg")
        .where("cg.courseId = :courseId", { courseId })
        .leftJoinAndSelect("cg.group", "g")
        .getMany();

    const courseTags = await staticProvider
        .ormConnection
        .getRepository(CourseTag)
        .createQueryBuilder("ct")
        .where("ct.courseId = :courseId", { courseId })
        .leftJoinAndSelect("ct.tag", "t")
        .getMany();

    const assignedOrganizations = courseOrganizations.map(co => co.organization)
    const assignedGroups = courseGroups.map(cg => cg.group)
    const assignedTags = courseTags.map(ct => ct.tag)

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