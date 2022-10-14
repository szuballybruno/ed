import { CourseData } from '../models/entity/course/CourseData';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { CourseAccessBridge } from '../models/entity/misc/CourseAccessBridge';
import { Department } from '../models/entity/misc/Department';
import { StorageFile } from '../models/entity/misc/StorageFile';
import { TeacherInfo } from '../models/entity/misc/TeacherInfo';
import { User } from '../models/entity/misc/User';
import { UserCourseBridge } from '../models/entity/misc/UserCourseBridge';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserOverviewView } from '../models/views/UserOverviewView';
import { BriefUserDataDTO } from '../shared/dtos/BriefUserDataDTO';
import { DepartmentDTO } from '../shared/dtos/DepartmentDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { UserControlDropdownDataDTO } from '../shared/dtos/UserControlDropdownDataDTO';
import { UserCourseStatsDTO } from '../shared/dtos/UserCourseStatsDTO';
import { UserDTO } from '../shared/dtos/UserDTO';
import { UserEditReadDTO } from '../shared/dtos/UserEditReadDTO';
import { UserEditSaveDTO } from '../shared/dtos/UserEditSaveDTO';
import { UserEditSimpleDTO } from '../shared/dtos/UserEditSimpleDTO';
import { UserAdminListDTO } from '../shared/dtos/UserAdminListDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { Id } from '../shared/types/versionId';
import { getFullName, mergeArraysByKey } from '../utilities/helpers';
import { InsertEntity } from '../utilities/misc';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { HashService } from './HashService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { RoleService } from './RoleService';
import { TeacherInfoService } from './TeacherInfoService';
import { TempomatService } from './TempomatService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserStatsService } from './UserStatsService';

export class UserService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _teacherInfoService: TeacherInfoService,
        private _hashService: HashService,
        private _roleService: RoleService,
        private _authorizationService: AuthorizationService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _userStatsService: UserStatsService,
        private _tempomatService: TempomatService) {
    }

    /**
     * Get admin user list  
     * TODO: what an absolute fucking garbage clusterfuck this is... NEEDS A SHITTON OF REFACTORING!
     */
    async getUserAdminListAsync(
        principalId: PrincipalId,
        isToBeReviewed: boolean,
        companyId: Id<'Company'> | null
    ) {

        // check if user can administrate selected company
        if (companyId)
            await this._authorizationService
                .checkPermissionAsync(principalId, 'ADMINISTRATE_COMPANY', { companyId: companyId });

        // TODO: CHECK FOR PERMISSIONS IN VIEW
        const availableUserOverviewViews = await this._ormService
            .query(UserOverviewView)
            .getMany();

        const companyUserOverviewViews = await this._ormService
            .query(UserOverviewView, { companyId })
            .where('companyId', '=', 'companyId')
            .getMany();

        // TODO: CHECK FOR PERMISSIONS IN VIEW
        const availableTempomatCalculationViews = await this._ormService
            .query(TempomatCalculationDataView)
            .innerJoin(User, x => x
                .on('id', '=', 'userId', TempomatCalculationDataView))
            .where('startDate', '!=', 'NULL')
            .and('originalPrevisionedCompletionDate', '!=', 'NULL')
            .getMany();

        const companyTempomatCalculationViews = await this._ormService
            .query(TempomatCalculationDataView, { companyId })
            .innerJoin(User, x => x
                .on('companyId', '=', 'companyId')
                .and('id', '=', 'userId', TempomatCalculationDataView))
            .where('startDate', '!=', 'NULL')
            .and('originalPrevisionedCompletionDate', '!=', 'NULL')
            .getMany();

        const selectedUserOverviewViews = companyId
            ? companyUserOverviewViews
            : availableUserOverviewViews;

        const selectedTempomatCalculationViews = companyId
            ? companyTempomatCalculationViews
            : availableTempomatCalculationViews;

        const userIdsWithLagBehindAvgs = selectedTempomatCalculationViews
            .groupBy(x => x.userId)
            .map(x => {

                const lagBehindAvg = this._tempomatService
                    .getAvgLagBehindPercentage(x.items);

                return {
                    userId: x.first.userId,
                    lagBehindAvg
                };
            });

        const userOverviewViewsWithLagBehind = mergeArraysByKey(selectedUserOverviewViews, userIdsWithLagBehindAvgs, 'userId');

        const userOverviewWithProductivity = userOverviewViewsWithLagBehind
            .groupBy(x => x.userId)
            .map(x => {

                const first = x.first;

                const productivityPercentage = this
                    ._userStatsService
                    .calculateProductivity(first.averagePerformancePercentage, first.lagBehindAvg);

                return {
                    ...first,
                    productivityPercentage,
                    invertedLagBehind: first.lagBehindAvg
                        ? 100 - first.lagBehindAvg
                        : null
                };
            });

        const allFlaggedUsers = await this
            ._userStatsService
            .flagUsersAsync(companyId);

        if (!allFlaggedUsers)
            return;

        const flaggedUsersOnly = userOverviewWithProductivity
            .filter(x => allFlaggedUsers
                .filter(x => x?.flag === 'low')
                .some(y => y?.userId === x.userId));

        return this._mapperService
            .mapTo(UserAdminListDTO, [isToBeReviewed ? flaggedUsersOnly : userOverviewWithProductivity]);
    }

    /**
     * Gets some dropdown data for the user control 
     */
    async getUserControlDropdownDataAsync(principalId: PrincipalId) {

        const departments = await this
            ._ormService
            .query(Department, {})
            .getMany();

        const availableRoles = await this
            ._roleService
            .getAllRolesAsync(principalId);

        const departmentDTOs = departments
            .map((x): DepartmentDTO => ({
                id: x.id,
                name: x.name
            }));

        return instantiate<UserControlDropdownDataDTO>({
            departments: departmentDTOs,
            availableRoles
        });
    }

    /**
     * Get user edit data
          */
    async getEditUserDataAsync(
        principalId: PrincipalId,
        editedUserId: Id<'User'> | null
    ) {

        const principalUser = await this._ormService
            .query(User, { userId: principalId })
            .where('id', '=', 'userId')
            .getSingle();

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'ADMINISTRATE_COMPANY',
                {
                    companyId: principalUser.companyId
                }
            );

        type ResType = User & {
            teacherInfoId: number
        };

        const res = await this._ormService
            .withResType<ResType>()
            .query(User, { editedUserId })
            .selectFrom(x => x
                .columns(User, '*')
                .columns(TeacherInfo, {
                    teacherInfoId: 'id'
                }))
            .leftJoin(TeacherInfo, x => x
                .on('userId', '=', 'editedUserId'))
            .where('id', '=', 'editedUserId')
            .getSingle();

        const userRoles = await this
            ._roleService
            .getUserRolesAsync(principalId, editedUserId);

        return instantiate<UserEditReadDTO>({
            userId: editedUserId,
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            isTeacher: !!res.teacherInfoId,
            departmentId: res.departmentId,
            companyId: res.companyId,
            roleIds: userRoles.map(x => x.roleId),
            isSurveyRequired: res.isSurveyRequired
        });
    }

    /**
     * Save user from admin page, where you can edit almost all fileds.
     */
    async saveUserAsync(principalId: PrincipalId, dto: UserEditSaveDTO) {

        const {
            userId,
            assignedRoleIds,
            companyId,
            departmentId,
            email,
            firstName,
            isTeacher,
            lastName,
            isSurveyRequired
        } = dto;

        const user = await this
            .getUserById(dto.userId);

        await this._authorizationService
            .checkPermissionAsync(principalId, 'ADMINISTRATE_COMPANY', { companyId: user.companyId });

        // save user
        await this._ormService
            .save(User, {
                id: userId,
                lastName,
                firstName,
                email,
                companyId,
                departmentId,
                isSurveyRequired
            });

        // save teacher info
        await this.saveTeacherInfoAsync(userId, isTeacher);

        // save auth items
        await this._roleService
            .saveUserRolesAsync(principalId, userId, assignedRoleIds);
    }

    /**
     * Saves user teacher info
     */
    async saveTeacherInfoAsync(userId: Id<'User'>, isTeacher: boolean) {

        const teacherInfo = await this._teacherInfoService
            .getTeacherInfoAsync(userId);

        // teacher info exists
        if (teacherInfo) {

            if (!isTeacher) {

                await this._teacherInfoService
                    .deleteTeacherInfoAsync(teacherInfo.id);
            }
        }

        // teacher info doesn't exist
        else {

            if (!teacherInfo && isTeacher) {

                await this._teacherInfoService
                    .createTeacherInfoAsync(userId);
            }
        }
    }

    /**
     * Save user data which the user itself can edit.
     */
    async saveUserSimpleAsync(
        principalId: PrincipalId,
        dto: UserEditSimpleDTO
    ) {

        const userId = principalId.getId();

        // save user
        await this._ormService
            .save(User, {
                id: userId,
                lastName: dto.lastName,
                firstName: dto.firstName,
                phoneNumber: dto.phoneNumber
            });
    }

    /**
     * Save user data which the user itself can edit.
     */
    async saveUserDataAsync(principalId: PrincipalId, dto: UserDTO) {

        const userId = principalId.getId();

        return this._ormService
            .save(User, {
                id: userId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber
            });
    }

    /**
     * Get a very minimalistic user dto for displaying
     * very minimal info about the user.
     */
    async getBriefUserDataAsync(principalId: PrincipalId, userId: Id<'User'>) {

        const user = await this
            .getUserById(userId);

        await this._authorizationService
            .checkPermissionAsync(principalId, 'ADMINISTRATE_COMPANY', { companyId: user.companyId });

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: getFullName(user)
        } as BriefUserDataDTO;
    }

    /**
     * Create a new user.
     */
    createUserAsync = async (insertUser: InsertEntity<User>, unhashedPassword: string): Promise<User> => {

        // check if user already exists with email
        const existingUser = await this.getUserByEmailAsync(insertUser.email);
        if (existingUser)
            throw new ErrorWithCode('User already exists. Email: ' + insertUser.email, 'email_taken');

        // hash user password
        const hashedPassword = await this
            ._hashService
            .hashPasswordAsync(unhashedPassword);

        insertUser.password = hashedPassword;

        // insert user
        const createdUser = await this._ormService
            .createAsync(User, insertUser);

        // insert signup answer session
        await this
            ._ormService
            .createAsync(AnswerSession, {
                userId: createdUser.id,
                examVersionId: Id.create<'ExamVersion'>(1),
                isPractise: false,
                startDate: new Date(),
                videoVersionId: null // 1 always points to signup exam
            });

        // insert practise answer session
        await this
            ._ormService
            .createAsync(AnswerSession, {
                userId: createdUser.id,
                isPractise: true,
                examVersionId: null,
                startDate: new Date(),
                videoVersionId: null
            });

        return createdUser;
    };

    /**
     * Accept the invitation,
     * whilst giving the user a password, for further logins.
     */
    setUserInivitationDataAsync = async (userId: Id<'User'>, rawPassword: string,) => {

        await this._ormService
            .save(User, {
                id: userId,
                isInvitationAccepted: true,
                password: await this._hashService
                    .hashPasswordAsync(rawPassword)
            });
    };

    /**
     * Get user entity by it's id.
     */
    getUserById = async (userId: Id<'User'> | PrincipalId) => {

        return this
            ._ormService
            .getSingleById(User, userId as any);
    };

    /**
     * Delete a user entity by its id.
     */
    async deleteUserAsync(principalId: PrincipalId, deletedUserId: Id<'User'>) {

        const user = await this
            .getUserById(deletedUserId);

        await this._authorizationService
            .checkPermissionAsync(principalId, 'ADMINISTRATE_COMPANY', { companyId: user.companyId });

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'DELETE_COMPANY_USER',
                { companyId: user.companyId }
            );

        const connectedCourses = await this._ormService
            .query(CourseData, { deletedUserId })
            .where('teacherId', '=', 'deletedUserId')
            .getMany();

        if (connectedCourses.length > 0)
            throw new ErrorWithCode('Cannot delete user when it\'s set as teacher on undeleted courses!', 'bad request');

        return this._ormService
            .softDelete(User, [deletedUserId]);
    }

    /**
     * Get user dto by userId.
     */
    async getUserDTOById(userId: Id<'User'>) {

        type Res = User & { filePath: string, departmentId: Id<'Department'>, departmentName: string };

        const view = await this
            ._ormService
            .withResType<Res>()
            .query(User, { userId })
            .selectFrom(x => x
                .columns(User, '*')
                .columns(StorageFile, {
                    filePath: 'filePath'
                })
                .columns(Department, {
                    departmentId: 'id',
                    departmentName: 'name'
                }))
            .leftJoin(StorageFile, x => x
                .on('id', '=', 'avatarFileId', User))
            .leftJoin(Department, x => x
                .on('id', '=', 'departmentId', User))
            .where('id', '=', 'userId')
            .getSingle();

        return this._mapperService
            .mapTo(UserDTO, [view, view.filePath, view.departmentId, view.departmentName]);
    }

    /**
     * Get user's active refresh token by userId.
     */
    async getUserRefreshTokenById(userId: Id<'User'>) {

        const user = await this.getUserById(userId);
        if (!user)
            return null;

        return user.refreshToken;
    }

    /**
     * Get a user by it's email address.
     * Which is also a unique identifier, like the id.
     */
    async getUserByEmailAsync(email: string) {

        const user = await this._ormService
            .query(User, { email })
            .where('email', '=', 'email')
            .getOneOrNull();

        return user;
    }

    /**
     * Get a user by it's email address.
     * Which is also a unique identifier, like the id.
     */
    async getUserByEmailOrFailAsync(email: string) {

        const user = await this
            .getUserByEmailAsync(email);

        if (!user)
            throw new Error(`User not found by email "${email}"!`);

        return user;
    }

    /**
     * Set user's avatar file id.
     */
    setUserAvatarFileId = async (userId: Id<'User'>, avatarFileId: Id<'StorageFile'>) => {

        await this._ormService
            .save(User, {
                id: userId,
                avatarFileId: avatarFileId
            });
    };

    /**
     * Set user's refresh token.
     */
    setUserActiveRefreshToken = (userId: Id<'User'>, refreshToken: string) => {

        return this._ormService
            .save(User, {
                id: userId,
                refreshToken: refreshToken
            });
    };

    /**
     * Set user's invitation token.
     */
    setUserInvitationTokenAsync = async (userId: Id<'User'>, invitationToken: string) => {

        await this._ormService
            .save(User, {
                id: userId,
                invitationToken
            });
    };

    /**
     * Remove user's refresh token,
     * so it can't get a new activation token,
     * even if it holds a valid refresh token on the client side.
     */
    removeRefreshToken = (userId: Id<'User'>) => {

        return this._ormService
            .save(User, {
                id: userId,
                refreshToken: ''
            });
    };

    /**
     * Get a list of the users marked as teacher.
     */
    getTeachersAsync = async () => {

        // const teachers = await this._ormService
        //     .getRepository(User)
        //     .find({
        //         where: {

        //         },
        //         relations: {
        //             teacherInfo: {

        //             }
        //         }
        //     });

        // return teachers;
    };

    /**
     * Saves user's courses
     */
    async saveUserCoursesAsync(userId: Id<'User'>, muts: Mutation<UserCourseStatsDTO, 'courseId'>[]) {

        await this._saveUserCourseAccessBridgesAsync(userId, muts);
        await this._saveUserCourseBridgesAsync(userId, muts);
        await this._saveUserCourseRequiredCompletionDates(userId, muts);
    }

    private async _saveUserCourseAccessBridgesAsync(userId: Id<'User'>, muts: Mutation<UserCourseStatsDTO, 'courseId'>[]) {

        /**
         * Save access bridges
         */
        const existingBridges = await this
            ._ormService
            .query(CourseAccessBridge, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const accessMutations = muts
            .filter(x => x.fieldMutators
                .some(x => x.field === 'isAccessible'))
            .map(x => ({
                key: x.key,
                isAccessable: x.fieldMutators
                    .single(x => x.field === 'isAccessible')
                    .value
            }));

        // new bridges
        const newBridges = accessMutations
            .filter(x => x.isAccessable)
            .filter(x => !existingBridges
                .some(b => b.courseId === x.key))
            .map(x => instantiate<InsertEntity<CourseAccessBridge>>({
                companyId: null,
                courseId: x.key,
                userId
            }));

        // insert new course acccess bridges
        await this
            ._ormService
            .createManyAsync(CourseAccessBridge, newBridges);

        // deleted bridges
        const deletedBridgeIds = existingBridges
            .filter(x => accessMutations
                .some(acmut => x.courseId === acmut.key && acmut.isAccessable === false))
            .map(x => x.id);

        await this
            ._ormService
            .hardDelete(CourseAccessBridge, deletedBridgeIds);
    }

    private async _saveUserCourseBridgesAsync(userId: Id<'User'>, muts: Mutation<UserCourseStatsDTO, 'courseId'>[]) {

        /**
         * Save access bridges
         */
        const existingBridges = await this
            ._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .getMany();

        const assignMutations = muts
            .filter(x => x.fieldMutators
                .some(x => x.field === 'isAssigned'))
            .map(x => ({
                key: x.key,
                isAssigned: x.fieldMutators
                    .single(x => x.field === 'isAssigned')
                    .value
            }));

        // new bridges
        const newBridges = assignMutations
            .filter(x => x.isAssigned)
            .filter(x => !existingBridges
                .some(b => b.courseId === x.key))
            .map(x => instantiate<InsertEntity<UserCourseBridge>>({
                courseId: x.key,
                userId,
                courseMode: 'beginner',
                creationDate: new Date(),
                currentItemCode: null,
                isCurrent: false,
                previsionedCompletionDate: null,
                requiredCompletionDate: null,
                stageName: 'assigned',
                startDate: null,
                tempomatMode: 'balanced'
            }));

        // insert new course acccess bridges
        await this
            ._ormService
            .createManyAsync(UserCourseBridge, newBridges);
    }

    private async _saveUserCourseRequiredCompletionDates(userId: Id<'User'>, muts: Mutation<UserCourseStatsDTO, 'courseId'>[]) {

        /**
         * Required completion dates
         */
        const completionDates = muts
            .filter(x => x.fieldMutators
                .some(x => x.field === 'requiredCompletionDate'))
            .map(x => ({
                courseId: x.key,
                requiredCompletionDate: x.fieldMutators
                    .single(x => x.field === 'requiredCompletionDate')
                    .value
            }));

        const userCourseBridges = await this
            ._ormService
            .query(UserCourseBridge, { userId, courseIds: completionDates.map(x => x.courseId) })
            .where('courseId', '=', 'courseIds')
            .and('userId', '=', 'userId')
            .getMany();

        const updatedUserCourseBridges = userCourseBridges
            .map(x => ({
                ...x,
                requiredCompletionDate: completionDates
                    .single(x => x.courseId === x.courseId)
                    .requiredCompletionDate
            } as UserCourseBridge));

        await this
            ._userCourseBridgeService
            .setRequiredCompletionDatesAsync(updatedUserCourseBridges);
    }
}
