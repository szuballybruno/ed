import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { CourseData } from '../models/entity/course/CourseData';
import { JobTitle } from '../models/entity/misc/JobTitle';
import { StorageFile } from '../models/entity/misc/StorageFile';
import { TeacherInfo } from '../models/entity/misc/TeacherInfo';
import { User } from '../models/entity/misc/User';
import { AdminUserListView } from '../models/views/AdminUserListView';
import { AdminPageUserDTO } from '../shared/dtos/admin/AdminPageUserDTO';
import { BriefUserDataDTO } from '../shared/dtos/BriefUserDataDTO';
import { ChangeSet } from '../shared/dtos/changeSet/ChangeSet';
import { UserDTO } from '../shared/dtos/UserDTO';
import { UserEditDTO } from '../shared/dtos/UserEditDTO';
import { UserEditSimpleDTO } from '../shared/dtos/UserEditSimpleDTO';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { Id } from '../shared/types/versionId';
import { getFullName, toFullName } from '../utilities/helpers';
import { InsertEntity } from '../utilities/misc';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { HashService } from './HashService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { RoleService } from './RoleService';
import { TeacherInfoService } from './TeacherInfoService';

export class UserService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _teacherInfoService: TeacherInfoService;
    private _hashService: HashService;
    private _roleService: RoleService;
    private _authorizationService: AuthorizationService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        teacherInfoService: TeacherInfoService,
        hashService: HashService,
        roleService: RoleService,
        authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._teacherInfoService = teacherInfoService;
        this._hashService = hashService;
        this._roleService = roleService;
        this._authorizationService = authorizationService;
    }

    /**
     * Get user edit data
          */
    async getEditUserDataAsync(
        principalId: PrincipalId,
        editedUserId: Id<'User'>
    ) {
        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'ACCESS_ADMIN'
            );

        const user = await this._ormService
            .query(User, { userId: editedUserId })
            .where('id', '=', 'userId')
            .getSingle();

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'EDIT_COMPANY_USER',
                { companyId: user.companyId }
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

        return {
            id: res.id,
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            isTeacher: !!res.teacherInfoId,
            jobTitleId: res.jobTitleId,
            companyId: res.companyId,
            roles: new ChangeSet(),
            permissions: new ChangeSet()
        };
    }

    /**
     * Save user from admin page, where you can edit almost all fileds.
     */
    saveUserAsync(principalId: PrincipalId, dto: UserEditDTO) {

        return {
            action: async () => {

                const userId = dto.id;

                // save user
                await this._ormService
                    .save(User, {
                        id: userId,
                        lastName: dto.lastName,
                        firstName: dto.firstName,
                        email: dto.email,
                        companyId: dto.companyId,
                        jobTitleId: dto.jobTitleId
                    });

                // save teacher info
                await this._saveTeacherInfoAsync(userId, dto.isTeacher);

                // save auth items
                await this._roleService
                    .saveUserAssignedAuthItemsAsync(principalId, userId, dto.roles, dto.permissions)
                    .action();
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };
    }

    /**
     * Saves user teacher info
     */
    private async _saveTeacherInfoAsync(userId: Id<'User'>, isTeacher: boolean) {

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
    saveUserSimpleAsync(
        principalId: PrincipalId,
        dto: UserEditSimpleDTO
    ) {

        return {
            action: async () => {

                const userId = principalId.getId();

                // save user
                await this._ormService
                    .save(User, {
                        id: userId,
                        lastName: dto.lastName,
                        firstName: dto.firstName,
                        phoneNumber: dto.phoneNumber
                    });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    /**
     * Get user dto-s for the admin page user list.
     */
    async getAdminPageUsersListAsync(principalId: PrincipalId, searchText: string | null) {

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'ACCESS_ADMIN'
            );

        const user = await this._ormService
            .query(User, { userId: principalId.getId() })
            .where('id', '=', 'userId')
            .getSingle();

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'VIEW_COMPANY_USERS',
                { companyId: user.companyId }
            );

        const searchTextLower = searchText?.toLowerCase();

        // TODO CHECK VIEW COMPANY USERS PERMISSION
        const users = await this._ormService
            .query(AdminUserListView)
            .getMany();

        const filteredUsers = searchTextLower
            ? users
                .filter(x => toFullName(x.firstName, x.lastName, 'hu')
                    .toLowerCase()
                    .includes(searchTextLower))
            : users;

        return this._mapperService
            .mapTo(AdminPageUserDTO, [filteredUsers]);
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

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'ACCESS_ADMIN'
            );

        const user = await this._ormService
            .query(User, { userId })
            .where('id', '=', 'userId')
            .getSingle();

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'VIEW_COMPANY_USERS',
                { companyId: user.companyId }
            );

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
    createUserAsync = async (user: InsertEntity<User>, unhashedPassword: string): Promise<User> => {

        // check if user already exists with email
        const existingUser = await this.getUserByEmailAsync(user.email);
        if (existingUser)
            throw new ErrorWithCode('User already exists. Email: ' + user.email, 'email_taken');

        // set all episto users as GOD
        // TODO
        console.warn('-------------------------------------------------------');
        console.warn('---------- SETTING NEW USER AS GOD!!!! ----------------');
        console.warn('-------------------------------------------------------');

        if (user.companyId === 2 as any)
            user.isGod = true;

        // hash user password
        const hashedPassword = await this
            ._hashService
            .hashPasswordAsync(unhashedPassword);

        user.password = hashedPassword;

        // insert user
        const userId = await this._ormService
            .createAsync(User, user);

        // insert signup answer session
        await this
            ._ormService
            .createAsync(AnswerSession, {
                userId: userId,
                examVersionId: Id.create<'ExamVersion'>(1),
                isPractise: false,
                startDate: new Date(),
                videoVersionId: null // 1 always points to signup exam
            });

        // insert practise answer session
        await this
            ._ormService
            .createAsync(AnswerSession, {
                userId: userId,
                isPractise: true,
                examVersionId: null,
                startDate: new Date(),
                videoVersionId: null
            });

        return user as User;
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
    getUserById = async (userId: Id<'User'>) => {

        const user = await this._ormService
            .query(User, { userId })
            .leftJoin(StorageFile, x => x
                .on('id', '=', 'avatarFileId', User))
            .leftJoin(JobTitle, x => x
                .on('id', '=', 'jobTitleId', User))
            .where('id', '=', 'userId')
            .getSingle();

        return user;
    };

    /**
     * Delete a user entity by its id.
     */
    async deleteUserAsync(principalId: PrincipalId, deletedUserId: Id<'User'>) {

        await this._authorizationService
            .checkPermissionAsync(
                principalId,
                'ACCESS_ADMIN'
            );

        const user = await this._ormService
            .query(User, { userId: deletedUserId })
            .where('id', '=', 'userId')
            .getSingle();

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
    getUserDTOById = async (userId: Id<'User'>) => {

        const foundUser = await this.getUserById(userId);

        if (!foundUser)
            return null;

        return this._mapperService
            .mapTo(UserDTO, [foundUser]);
    };

    /**
     * Get user's active refresh token by userId.
     */
    getUserRefreshTokenById = async (userId: Id<'User'>) => {

        const user = await this.getUserById(userId);
        if (!user)
            return null;

        return user.refreshToken;
    };

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
}
