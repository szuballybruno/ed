import { Course } from "../models/entity/Course";
import { CourseGroup } from "../models/entity/CourseGroup";
import { CourseOrganization } from "../models/entity/CourseOrganization";
import { CourseTag } from "../models/entity/CourseTag";
import { Group } from "../models/entity/Group";
import { Organization } from "../models/entity/Organization";
import { Tag } from "../models/entity/Tag";
import { AdminPageEditCourseDTO, EditListItemDTO } from "../models/shared_models/AdminPageEditCourseDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { staticProvider } from "../staticProvider";
import { toCourseItemDTO, toCourseItemDTOExam, toCourseItemDTOVideo, toEditCourseItemsDTO, toUserDTO } from "./mappings";
import { getAssetUrl } from "./misc/urlProvider";
import { getTeacherDTOAsync } from "./userService";

export const getEditedVideoAsync = async (videoId: string) => {
    // TODO: Create a method to get the currently edited video by videoId
}

export const updateCourseAsync = async (dto: AdminPageEditCourseDTO) => {

    // save related groups
    await saveCourseGroupsAsync(dto.courseId, dto.groups);

    // Updating courses data
    await staticProvider
        .ormConnection
        .getRepository(Course)
        .save({
            id: dto.courseId,
            title: dto.title,
            category: dto.category,
            courseGroup: dto.courseGroup,
            permissionLevel: dto.permissionLevel,
            colorOne: dto.colorOne,
            colorTwo: dto.colorTwo
        });
}

const saveCourseGroupsAsync = async (courseId: number, groups: EditListItemDTO[]) => {

    // get the checked groups
    const checkedGroupIds = groups
        .filter(group => group.checked)
        .map(group => group.id);

    // get the unchecked groups
    const unCheckedGroupIds = groups
        .filter(group => !group.checked)
        .map(group => group.id);

    // insert associations between checked groups and current course
    const checkedCourseGroups = checkedGroupIds
        .map(groupId => ({ courseId: courseId, groupId: groupId } as CourseGroup));

    await staticProvider
        .ormConnection
        .getRepository(CourseGroup)
        .save(checkedCourseGroups);

    // delete associations between uncheked groups and current course
    await deleteFromCourseGroupAsync(unCheckedGroupIds);
}

const deleteFromCourseGroupAsync = async (groupIds: number[]) => {

    if (groupIds.length === 0)
        return;

    await staticProvider
        .ormConnection
        .createQueryBuilder()
        .delete()
        .from(CourseGroup)
        .where("groupId IN (:...groupIds)", { groupIds })
        .execute()
}

export const getEditedCourseAsync = async (courseId: number) => {

    // get connected entity options
    const organizations = await getOrganizationAsync();
    const teachers = await getTeacherDTOAsync();
    const groups = await getGroupAsync();
    const tags = await getTagsAsync();

    // get assinged entities
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

    // get course 
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

    // get thumbnail 
    const thumbnailImageURL = course.coverFile
        ? getAssetUrl(course.coverFile.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    // get assined entity lists
    const courseTeacher = toUserDTO(course.teacher);
    const courseOrganizationsChecked = createCheckedById(organizations, assignedOrganizations)
    const courseGroupsChecked = createCheckedById(groups, assignedGroups)
    const courseTagsChecked = createCheckedById(tags, assignedTags)
    const courseTeachersChecked = createCheckedById(teachers, [courseTeacher]);

    // get course items 
    const videoCourseItemDTOs = course
        .videos
        .map(x => toCourseItemDTOVideo(x));

    const examCourseItemDTOs = course
        .exams
        .map(x => toCourseItemDTOExam(x));

    const courseItemDTOs = videoCourseItemDTOs
        .concat(examCourseItemDTOs)
        .orderBy(x => x.orderIndex);

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        courseGroup: course.courseGroup,
        permissionLevel: course.permissionLevel,
        thumbnailURL: thumbnailImageURL,
        colorOne: course.colorOne,
        colorTwo: course.colorTwo,
        courseItems: courseItemDTOs,
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