import { AnswerSession } from '../models/entity/AnswerSession';
import { CourseData } from '../models/entity/course/CourseData';
import { JobTitle } from '../models/entity/JobTitle';
import { StorageFile } from '../models/entity/StorageFile';
import { TeacherInfo } from '../models/entity/TeacherInfo';
import { User } from '../models/entity/User';
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
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
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
    getEditUserDataAsync(
        principalId: PrincipalId,
        editedUserId: Id<'User'>
    ): ControllerActionReturnType {

        return {
            action: async () => {

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

            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };
    }

    /**
     * Save user from admin page, where you can edit almost all fileds.
     */
    saveUserAsync(principalId: PrincipalId, dto: UserEditDTO): ControllerActionReturnType {

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
                    .saveUserAssignedAuthItemsAsync(principalId, userId, dto.roles, dto.permissions);
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
    ): ControllerActionReturnType {

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
    getAdminPageUsersListAsync(principalId: PrincipalId, searchText: string | null): ControllerActionReturnType {

        return {
            action: async () => {
                const searchTextLower = searchText?.toLowerCase();

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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };


    }

    /**
     * Save user data which the user itself can edit.  
     */
    saveUserDataAsync(principalId: PrincipalId, dto: UserDTO): ControllerActionReturnType {

        return {
            action: async () => {
                const userId = principalId.getId();

                return this._ormService
                    .save(User, {
                        id: userId,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
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
     * Get a very minimalistic user dto for displaying 
     * very minimal info about the user.
     */
    getBriefUserDataAsync(principalId: PrincipalId, userId: Id<'User'>) {

        return {

            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_ADMIN');
            }
        };
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
     * Delete a user entity by it's id.
     */
    deleteUserAsync(principalId: PrincipalId, deletedUserId: Id<'User'>) {

        return {
            action: async () => {
                const connectedCourses = await this._ormService
                    .query(CourseData, { deletedUserId })
                    .where('teacherId', '=', 'deletedUserId')
                    .getMany();

                if (connectedCourses.length > 0)
                    throw new ErrorWithCode('Cannot delete user when it\'s set as teacher on undeleted courses!', 'bad request');

                return await this._ormService
                    .softDelete(User, [deletedUserId]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'DELETE_USER');
            }
        };
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
    getUserByEmailAsync = async (email: string) => {

        const user = await this._ormService
            .query(User, { email })
            .where('email', '=', 'email')
            .getOneOrNull();

        return user;
    };

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