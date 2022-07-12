import { UploadedFile } from 'express-fileupload';
import { Course } from '../models/entity/course/Course';
import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { CourseAccessBridge } from '../models/entity/CourseAccessBridge';
import { CourseCategory } from '../models/entity/CourseCategory';
import { StorageFile } from '../models/entity/StorageFile';
import { TeacherInfo } from '../models/entity/TeacherInfo';
import { User } from '../models/entity/User';
import { AvailableCourseView } from '../models/views/AvailableCourseView';
import { CourseAdminContentView } from '../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../models/views/CourseDetailsView';
import { CourseItemPlaylistView } from '../models/views/CourseItemPlaylistView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { CourseAdminListItemDTO } from '../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentAdminDTO } from '../shared/dtos/admin/CourseContentAdminDTO';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseBriefData } from '../shared/dtos/CourseBriefData';
import { CourseDetailsDTO } from '../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CourseShortDTO } from '../shared/dtos/CourseShortDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { ModuleEditDTO } from '../shared/dtos/ModuleEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { PlaylistModuleDTO } from '../shared/dtos/PlaylistModuleDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { OrderType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/ActionParams';
import { filterByProperty, orderByProperty, throwNotImplemented } from '../utilities/helpers';
import { VersionMigrationHelpers } from '../utilities/misc';
import { FileService } from './FileService';
import { MapperService } from './MapperService';
import { createCharSeparatedList } from './misc/mappings';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PretestService } from './PretestService';
import { SaveEntityType } from './XORM/XORMTypes';

export class CourseService {

    constructor(
        private _moduleService: ModuleService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _fileService: FileService,
        private _pretestService: PretestService) {
    }

    /**
     * Returns courses that the principal can use as context
     * when assigning permissions to a user 
     */
    async getPermissionAssignCoursesAsync(principalId: PrincipalId, userId: Id<'User'>) {

        // TODO: CourseDataId is not CourseId
        throwNotImplemented()

        /* const courses = await this._ormService
            .query(CourseData)
            .getMany();

        return courses
            .map((x): CoursePermissionAssignDTO => ({
                id: x.id,
                title: x.title
            })); */
    }

    /**
     * Reruns a course view
     */
    async getCourseViewAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const view = await this._ormService
            .query(AvailableCourseView, { courseId, userId })
            .where('courseId', '=', 'courseId')
            .and('userId', '=', 'courseId')
            .getSingle();

        return view;
    }

    /**
     * Returns course brief data async 
     */
    async getCourseBriefDataAsync(courseId: Id<'Course'>) {

        const course = await this._ormService
            .getSingleById(CourseData, courseId);

        return this._mapperService
            .mapTo(CourseBriefData, [course, courseId]);
    }

    /**
     * Returns course detals 
     */
    async getCourseDetailsAsync(userId: PrincipalId, courseId: Id<'Course'>) {

        const courseDetailsView = await this._ormService
            .query(CourseDetailsView, { userId: userId.toSQLValue(), courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        const moduleViews = await this._ormService
            .query(CourseItemPlaylistView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getMany();

        const playlistModuleDTOs = this._mapperService
            .mapTo(PlaylistModuleDTO, [moduleViews])

        return this._mapperService
            .mapTo(CourseDetailsDTO, [courseDetailsView, playlistModuleDTOs]);
    }

    /**
     * Creates a new course 
     */
    async createCourseAsync(dto: CreateCourseDTO) {

        throwNotImplemented();

        const newCourse = {
            title: dto.title,
            teacherId: Id.create<'User'>(1),
            categoryId: Id.create<'CourseCategory'>(1),
            subCategoryId: Id.create<'CourseCategory'>(1),
            difficulty: 0,
            benchmark: 0,
            description: '',
            shortDescription: '',
            language: 'magyar',
            previouslyCompletedCount: 0,
            visibility: 'private',
            technicalRequirements: '',
            humanSkillBenefits: '',
            humanSkillBenefitsDescription: '',
            requirementsDescription: '',
            skillBenefits: ''
        } as CourseData;

        await this._ormService
            .createAsync(CourseData, newCourse);

        /*  await this._pretestService
             .createPretestExamAsync(newCourse.id); */
    }

    /**
     * Save course thumbnail.
     */
    async saveCourseThumbnailAsync(file: UploadedFile, courseId: Id<'Course'>) {

        const getCourseDataAsync = () => this._ormService
            .getSingleById(CourseData, courseId);

        const courseData = await getCourseDataAsync()

        const setCourseThumbnailIdAsync = (thumbnailFileId: Id<'StorageFile'>) => this._ormService
            .save(CourseData, instantiate<SaveEntityType<CourseData>>({
                id: courseData.id,
                coverFileId: thumbnailFileId
            }));

        return this._fileService
            .uploadAssigendFileAsync<CourseData>(
                this._fileService.getFilePath('courseCoverImages', 'courseCoverImage', courseId, 'jpg'),
                getCourseDataAsync,
                setCourseThumbnailIdAsync,
                course => course.coverFileId,
                file.data);
    }

    /**
     * Returns the course id from an item code.
     */
    async getCourseIdOrFailAsync(playlistItemCode: string) {

        const viewIfPlaylistItemCode = await this._ormService
            .query(CourseItemPlaylistView, { playlistItemCode })
            .where('playlistItemCode', '=', 'playlistItemCode')
            .getOneOrNull();

        if (viewIfPlaylistItemCode)
            return viewIfPlaylistItemCode.courseId

        const viewIfModuleCode = await this._ormService
            .query(CourseItemPlaylistView, { moduleCode: playlistItemCode, itemOrderIndex: 0 })
            .where('moduleCode', '=', 'moduleCode')
            .and('itemOrderIndex', '=', 'itemOrderIndex')
            .getSingle()

        return viewIfModuleCode.courseId;
    }

    /**
     * Gets the course details edit DTO.
          */
    async getCourseDetailsEditDataAsync(courseId: number) {

        // get course 
        const view = await this._ormService
            .query(CourseAdminDetailedView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle()

        const categories = await this._ormService
            .query(CourseCategory)
            .getMany();

        const teachers = await this._ormService
            .query(User)
            .innerJoin(TeacherInfo, x => x
                .on('userId', '=', 'id', User))
            .getMany();

        return this._mapperService
            .mapTo(CourseDetailsEditDataDTO, [view, categories, teachers]);
    }

    /**
     * Saves the course details 
     * without incrementing version
     * version incrementation is only necessary when 
     * adding breaking changes, like modifying exams, 
     * or playlist order indices. Changing the course name, or description etc.
     * is not considered a breaking change.
     */
    async saveCourseDetailsAsync(dto: CourseDetailsEditDataDTO) {

        const cv = await this._ormService
            .withResType<CourseVersion>()
            .query(LatestCourseVersionView, { courseId: dto.courseId })
            .select(CourseVersion)
            .leftJoin(CourseVersion, x => x
                .on('id', '=', 'versionId', LatestCourseVersionView))
            .where('courseId', '=', 'courseId')
            .getSingle();

        const courseDataId = cv.courseDataId;

        // save basic info
        await this._ormService
            .save(CourseData, {
                id: courseDataId,
                title: dto.title,
                teacherId: dto.teacherId,
                categoryId: dto.category.id,
                subCategoryId: dto.subCategory.id,
                benchmark: dto.benchmark,
                description: dto.description,
                difficulty: dto.difficulty,
                language: dto.language,
                shortDescription: dto.shortDescription,
                previouslyCompletedCount: dto.previouslyCompletedCount,
                humanSkillBenefitsDescription: dto.humanSkillBenefitsDescription,
                skillBenefits: createCharSeparatedList(dto.skillBenefits ?? []),
                technicalRequirements: createCharSeparatedList(dto.technicalRequirements ?? []),
                requirementsDescription: dto.technicalRequirementsDescription,
                humanSkillBenefits: createCharSeparatedList(dto
                    .humanSkillBenefits
                    .map(x => `${x.text}: ${x.value}`)),
                visibility: dto.visibility
            });
    }

    /**
     * Gets the course content edit DTO.
     */
    async getCourseContentAdminDataAsync(courseId: Id<'Course'>, loadDeleted: boolean) {

        const views = await this._ormService
            .query(CourseAdminContentView, { courseId })
            .where('courseId', '=', 'courseId')
            .getMany();

        const modules = await this._moduleService
            .getModuleEditDTOsAsync(courseId);

        const items = this._mapperService
            .mapTo(CourseContentItemAdminDTO, [views]);

        return {
            items,
            modules
        } as CourseContentAdminDTO;
    }

    /**
     * Saves the course content 
     */
    async saveCourseContentAsync(
        courseId: Id<'Course'>,
        itemMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[],
        moduleMutations: Mutation<ModuleEditDTO, 'versionId'>[]) {

        if (itemMutations.length === 0 && moduleMutations.length === 0)
            return;

        // save course 
        const { courseVersionMigrations } = await this
            ._saveCourseVersionAsync(courseId);

        // save modules 
        await this
            ._moduleService
            .saveModulesAsync({
                courseVersionMigrations,
                moduleMutations,
                itemMutations
            });
    }

    /**
     * Save course version 
     * TODO use version save service
     * @deprecated
     */
    private async _saveCourseVersionAsync(courseId: Id<'Course'>) {

        // get old version id 
        const oldCourseVersionId = (await this._ormService
            .query(LatestCourseVersionView, { courseId })
            .where('courseId', '=', 'courseId')
            .getSingle())
            .versionId;

        // create new version
        const newCourseVersionId = await this
            ._createNewCourseVersionAsync(courseId, oldCourseVersionId);

        const courseVersionMigrations = VersionMigrationHelpers
            .create([oldCourseVersionId], [newCourseVersionId]);

        return { courseVersionMigrations };
    }

    /**
     * TODO use version save service
     * @deprecated 
     */
    private async _createNewCourseVersionAsync(courseId: Id<'Course'>, oldVersionId: Id<'CourseVersion'>) {

        const oldDataId = (await this._ormService
            .query(CourseVersion, { oldVersionId })
            .where('id', '=', 'oldVersionId')
            .getSingle())
            .courseDataId;

        const newVersionId = await this._ormService
            .createAsync(CourseVersion, {
                courseId,
                courseDataId: oldDataId
            });

        return newVersionId;
    }

    /**
     * Returns admin list items 
     */
    async getAdminCoursesAsync() {

        const courseAdminShortViews = await this._ormService
            .query(CourseAdminShortView)
            .getMany();

        return this._mapperService
            .mapTo(CourseAdminListItemDTO, [courseAdminShortViews]);
    }

    /**
     * Soft delete course.
     */
    async softDeleteCourseAsync(courseId: Id<'Course'>) {

        await this._ormService
            .softDelete(CourseData, [courseId]);
    }

    /**
     * Returns the currently available courses. 
     */
    async getAvailableCoursesAsync(
        userId: PrincipalId,
        searchTerm: string,
        filterCategoryId: number | null,
        isFeatured: boolean,
        isRecommended: boolean,
        orderBy: OrderType
    ) {

        const courses = await this._ormService
            .query(AvailableCourseView, { userId })
            .where('userId', '=', 'userId')
            .and('canView', '=', 'true')
            .getMany();

        const filteredCoursesBySearchTerm =
            filterByProperty(courses, 'title', searchTerm)

        const filteredCoursesByCategoryId =
            filterByProperty(filteredCoursesBySearchTerm, 'subCategoryId', filterCategoryId)

        const filteredCoursesByIsFeatured =
            filterByProperty(filteredCoursesByCategoryId, 'isFeatured', isFeatured)

        const filteredCoursesByIsRecommended =
            filterByProperty(filteredCoursesByIsFeatured, 'isFeatured', isRecommended)

        const orderCourses = (courses: AvailableCourseView[], orderType: string) => {
            if (orderBy === 'nameASC')
                return orderByProperty(courses, 'title', 'asc')
            if (orderBy === 'nameDESC')
                return orderByProperty(courses, 'title', 'desc')
            return courses
        }

        const orderedCourses = orderCourses(filteredCoursesByIsRecommended, orderBy)

        return this._mapperService
            .mapTo(CourseShortDTO, [orderedCourses]);
    }

    /**
     * Creates a course access bridge, 
     * which opens access to a course for a specified user.
     * This can be used to dinamically allow or disallow access to a course, by the user.
     * Like when purchased from the shop, or got limited access etc... 
     */
    async createCourseAccessBridge(userId: Id<'User'>, courseId: Id<'Course'>) {

        await this._ormService
            .createAsync(CourseAccessBridge, {
                courseId,
                userId
            } as CourseAccessBridge);
    }
}