import { instantiate } from '@episto/commonlogic';
import { ErrorWithCode, Id, InvertedLagBehindRatingType, OverallScoreRatingType, UserRegistrationStatusType } from '@episto/commontypes';
import { BriefUserDataDTO, DepartmentDTO, Mutation, UserAdminListDTO, UserControlDropdownDataDTO, AdminUserCourseDTO, UserDTO, UserEditReadDTO, UserEditSaveDTO, UserEditSimpleDTO } from '@episto/communication';
import { PrincipalId } from '@episto/x-core';
import { RegistrationType } from '../models/misc/Types';
import { AnswerSession } from '../models/tables/AnswerSession';
import { CourseAccessBridge } from '../models/tables/CourseAccessBridge';
import { CourseData } from '../models/tables/CourseData';
import { Department } from '../models/tables/Department';
import { StorageFile } from '../models/tables/StorageFile';
import { TeacherInfo } from '../models/tables/TeacherInfo';
import { User } from '../models/tables/User';
import { UserCourseBridge } from '../models/tables/UserCourseBridge';
import { AdminUserListView } from '../models/views/AdminUserListView';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserOverviewView } from '../models/views/UserOverviewView';
import { UserPerformanceComparisonStatsView } from '../models/views/UserPerformanceComparisonStatsView';
import { UserPerformanceView } from '../models/views/UserPerformanceView';
import { getFullName, mergeArraysByKey } from '../utilities/helpers';
import { InsertEntity } from '../utilities/misc';
import { AuthorizationService } from './AuthorizationService';
import { HashService } from './HashService';
import { MapperService } from './MapperService';
import { UserLagbehindStatType } from './misc/types';
import { ORMConnectionService } from './ORMConnectionService';
import { RoleService } from './RoleService';
import { TeacherInfoService } from './TeacherInfoService';
import { TempomatService } from './TempomatService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { UserStatsService } from './UserStatsService';

interface UserFlagCalculationType extends UserPerformanceComparisonStatsView {
    userProductivity: number,
    companyAvgPerformancePercentage: number,
    companyAvgProductivityPercentage: number
}

interface CompanyUserPerformance extends UserPerformanceView {
    companyId: Id<'Company'>
}

interface CompanyTempomatCalculationData extends TempomatCalculationDataView {
    companyId: Id<'Company'>
}

type FlaggedUserType = {
    userId: Id<"User">;
    flag: UserFlagType;
};

type UserFlagType = 'low' | 'avg' | 'high'

export class UserService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _teacherInfoService: TeacherInfoService,
        private _hashService: HashService,
        private _roleService: RoleService,
        private _authorizationService: AuthorizationService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _tempomatService: TempomatService,
        private _userStatsService: UserStatsService) {
    }

    /**
     * Get admin user list
     */
    async getUserAdminListAsync(
        principalId: PrincipalId,
        //showReviewRequiredUsersOnly: boolean,
        companyId: Id<'Company'> | null
    ) {

        /**
          * Check permission 
          */
        if (companyId)
            await this._authorizationService
                .checkPermissionAsync(principalId, 'ADMINISTRATE_COMPANY', { companyId: companyId });

        /**
         * This is sort of a cheat way to filter by companyId, 
         * since if the company is is null, the equasion will be: != null,
         * meaning all rows will be returned, regardless of their companyId  
         */
        const companyFilterOperator = companyId === null
            ? '!='
            : '=';

        const companyUserOverviewViews = await this._ormService
            .query(UserOverviewView, { companyId })
            .where('companyId', companyFilterOperator, 'companyId')
            .getMany();

        // USER FILTERING DISABLED TEMPORARILY
        /* const userIds = companyUserOverviewViews
            .map(x => x.userId); */

        const userProductivityAndLagBehindStats = await this
            ._getUserLagBehindStatsAsync(companyUserOverviewViews, companyId);

        /* const lowFlaggedUserIds = await this
            ._getLowFlaggedUserIdsAsync(userIds, companyId); */

        const viewsWithTextRatings = companyUserOverviewViews
            .map(x => ({
                ...x,
                summerizedScoreAvgRatingText: this._getOverallScoreRating(x.summerizedScoreAvg)
            }))

        /*const filterdViews =  showReviewRequiredUsersOnly
            ? companyUserOverviewViews
                .filter(x => lowFlaggedUserIds
                    .some(y => y === x.userId))
            : companyUserOverviewViews; */

        return this
            ._mapperService
            .mapTo(UserAdminListDTO, [viewsWithTextRatings, userProductivityAndLagBehindStats]);
    }

    /**
     * Get overall score rating
     */
    private _getOverallScoreRating(overallScorePercentage: number): OverallScoreRatingType {

        if (overallScorePercentage < 0)
            throw new Error(`Overall score is not allowed to be smaller than zero!`);

        if (overallScorePercentage > 80)
            return 'very_good';

        if (overallScorePercentage > 60)
            return 'good';

        if (overallScorePercentage > 40)
            return 'average';

        if (overallScorePercentage > 20)
            return 'bad';

        return 'very_bad';
    }

    /**
  * Get performance rating
  */
    private _getinvertedRelativeUserPaceDiffRating(invertedRelativeUserPaceDiff: number): InvertedLagBehindRatingType {

        if (invertedRelativeUserPaceDiff < 0)
            throw new Error(`Inverted relative user pace diff is not allowed to be smaller than zero!`);

        if (invertedRelativeUserPaceDiff > 90)
            return 'very_good';

        if (invertedRelativeUserPaceDiff > 70)
            return 'good';

        if (invertedRelativeUserPaceDiff > 50)
            return 'average';

        if (invertedRelativeUserPaceDiff > 30)
            return 'bad';

        return 'very_bad';
    }

    /**
     * getUserLagBehindStatsAsync
     */
    private async _getUserLagBehindStatsAsync(
        companyUserOverviewViews: UserOverviewView[],
        companyId: Id<'Company'> | null) {

        const userIds = companyUserOverviewViews
            .map(x => x.userId);

        const userIdRelativePaceDiffAvgRows = await this
            ._getAvgUserRelativePaceDiffs(userIds, companyId);

        const userProductivityAndLagBehindStats = companyUserOverviewViews
            .map(({ userId, averagePerformancePercentage }) => {

                const relativePaceDiffAvg = userIdRelativePaceDiffAvgRows
                    .single(x => x.userId === userId)
                    .relativePaceDiffAvg;

                const productivityPercentage = this
                    ._userStatsService
                    .calculateProductivity(averagePerformancePercentage, relativePaceDiffAvg);

                const invertedRelativeUserPaceDiff = (() => {

                    if (!relativePaceDiffAvg)
                        return null;

                    if (relativePaceDiffAvg >= 200)
                        return 100;

                    // -195 means so much lag behind that it's basically 0 progress
                    if (relativePaceDiffAvg <= -195)
                        return 0;

                    // calculates a % value from -195...200 range
                    return 100 * (relativePaceDiffAvg - (-195)) / (200 - (-195))
                })();

                const invertedRelativeUserPaceDiffTextRating = invertedRelativeUserPaceDiff
                    ? this._getinvertedRelativeUserPaceDiffRating(invertedRelativeUserPaceDiff)
                    : null;

                return instantiate<UserLagbehindStatType>({
                    userId,
                    invertedRelativeUserPaceDiff,
                    invertedRelativeUserPaceDiffTextRating,
                    productivityPercentage
                });
            });

        return userProductivityAndLagBehindStats;
    }

    /**
     * getLowFlaggedUserIdsAsync
     */
    private async _getLowFlaggedUserIdsAsync(userIds: Id<'User'>[], companyId: Id<'Company'> | null) {

        const lowUserFlags = await this
            ._userStatsService
            .flagUsersAsync(companyId, 'low');

        const lowFlaggedUserIds = userIds
            .filter(userId => lowUserFlags
                .some(userFlag => userFlag.userId === userId));

        return lowFlaggedUserIds;
    }

    /**
 * getAvgUserLagBehinds
 */
    private async _getAvgUserRelativePaceDiffs(userIds: Id<'User'>[], companyId: Id<'Company'> | null) {

        /**
         * This is sort of a cheat way to filter by companyId, 
         * since if the company is is null, the equasion will be: != null,
         * meaning all rows will be returned, regardless of their companyId  
         */
        const companyFilterOperator = companyId === null
            ? '!='
            : '=';

        // TODO: CHECK FOR PERMISSIONS IN VIEW
        const companyTempomatCalculationViews = await this._ormService
            .query(TempomatCalculationDataView, { companyId })
            .innerJoin(User, x => x
                .on('companyId', companyFilterOperator, 'companyId')
                .and('id', '=', 'userId', TempomatCalculationDataView))
            .where('startDate', 'IS NOT', 'NULL')
            .and('originalPrevisionedCompletionDate', 'IS NOT', 'NULL')
            .getMany();

        const userIdRelativePaceDiffAvgRows = this._tempomatService
            .getAvgRelativeUserPaceDiffs(companyTempomatCalculationViews);

        const userOverviewViewsWithRelativePaceDiff = userIds
            .map(userId => {

                const relativePaceDiffAvgRow = userIdRelativePaceDiffAvgRows
                    .firstOrNull(userIdRelativePaceDiffAvgRows => userIdRelativePaceDiffAvgRows.userId === userId);

                const relativePaceDiffAvg = relativePaceDiffAvgRow?.relativeUserPaceDiff ?? 0;

                return {
                    userId,
                    relativePaceDiffAvg
                };
            });

        return userOverviewViewsWithRelativePaceDiff;
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

        const teacherInfo = await this
            ._teacherInfoService
            .getTeacherInfoOrNullAsync(userId);

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

        const userId = principalId
            .getId();

        await this
            ._checkIfUsernameTakenAsync(dto.username, userId);

        // save user
        await this._ormService
            .save(User, {
                id: userId,
                lastName: dto.lastName,
                firstName: dto.firstName,
                phoneNumber: dto.phoneNumber,
                username: dto.username
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

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: getFullName(user)
        } as BriefUserDataDTO;
    }

    /**
     * Create user simple
     */
    async createUserSimpleAsync({
        email,
        firstName,
        lastName,
        companyId,
        departmentId,
        invitationToken,
        isSurveyRequired,
        unhashedPassword,
        registrationType,
        username,
        registrationState
    }: {
        email: string,
        firstName: string,
        lastName: string,
        companyId: Id<'Company'>,
        departmentId: Id<'Department'>,
        invitationToken: string | null,
        isSurveyRequired: boolean,
        unhashedPassword: string,
        registrationType: RegistrationType,
        registrationState: UserRegistrationStatusType,
        username: string,
    }) {

        return await this
            .insertUserAsync({
                email,
                firstName,
                lastName,
                creationDate: new Date(Date.now()),
                companyId,
                departmentId,
                registrationType,
                password: unhashedPassword,
                invitationToken,
                isGod: false,
                avatarFileId: null,
                deletionDate: null,
                registrationStatus: registrationState,
                linkedInUrl: null,
                phoneNumber: null,
                refreshToken: null,
                resetPasswordToken: null,
                userDescription: null,
                username,
                isSurveyRequired
            });
    }

    /**
     * Create a new user.
     */
    async insertUserAsync(user: InsertEntity<User>): Promise<User> {

        // check if user already exists with email
        const existingUser = await this.getUserByEmailAsync(user.email);
        if (existingUser)
            throw new ErrorWithCode('User already exists. Email: ' + user.email, 'email_taken');

        // check username 
        await this
            ._checkIfUsernameTakenAsync(user.username ?? '');

        // hash user password
        if (!user.password)
            throw new Error('Password no found!');

        const hashedPassword = await this
            ._hashService
            .hashPasswordAsync(user.password);

        user.password = hashedPassword;

        // insert user
        const createdUser = await this._ormService
            .createAsync(User, user);

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
                registrationStatus: 'active',
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
    async saveUserCoursesAsync(userId: Id<'User'>, muts: Mutation<AdminUserCourseDTO, 'courseId'>[]) {

        await this._saveUserCourseAccessBridgesAsync(userId, muts);
        await this._saveUserCourseBridgesAsync(userId, muts);
        await this._saveUserCourseRequiredCompletionDates(userId, muts);
    }

    private async _saveUserCourseAccessBridgesAsync(userId: Id<'User'>, muts: Mutation<AdminUserCourseDTO, 'courseId'>[]) {

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

    private async _saveUserCourseBridgesAsync(userId: Id<'User'>, muts: Mutation<AdminUserCourseDTO, 'courseId'>[]) {

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
                lastInteractionDate: null,
                requiredCompletionDate: null,
                originalEstimatedCompletionDate: null,
                stageName: 'assigned',
                startDate: null,
                tempomatMode: 'strict'
            }));

        // insert new course acccess bridges
        await this
            ._ormService
            .createManyAsync(UserCourseBridge, newBridges);
    }

    private async _saveUserCourseRequiredCompletionDates(userId: Id<'User'>, muts: Mutation<AdminUserCourseDTO, 'courseId'>[]) {

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

    /**
     * Check if username is taken or not 
     */
    private async _checkIfUsernameTakenAsync(username: string, userId?: Id<'User'>) {

        const user = await this
            ._ormService
            .query(User, { username, userId: userId ?? -1 })
            .where('username', '=', 'username')
            .and('id', '!=', 'userId')
            .getOneOrNull();

        if (user)
            throw new ErrorWithCode('Username is taken!', 'username_invalid');
    }



}
