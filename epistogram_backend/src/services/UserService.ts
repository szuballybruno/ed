import { AnswerSession } from '../models/entity/AnswerSession';
import { Course } from '../models/entity/Course';
import { User } from '../models/entity/User';
import { AdminPageUserDTO } from '../shared/dtos/admin/AdminPageUserDTO';
import { BriefUserDataDTO } from '../shared/dtos/BriefUserDataDTO';
import { RoleIdEnum } from '../shared/types/sharedTypes';
import { UserDTO } from '../shared/dtos/UserDTO';
import { UserEditDTO } from '../shared/dtos/UserEditDTO';
import { UserEditSimpleDTO } from '../shared/dtos/UserEditSimpleDTO';
import { RegistrationType } from '../models/DatabaseTypes';
import { AdminUserListView } from '../models/views/UserAdminListView';
import { getFullName, toFullName, ErrorCode } from '../utilities/helpers';
import { HashService } from './HashService';
import { MapperService } from './MapperService';
import { log } from './misc/logger';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TeacherInfoService } from './TeacherInfoService';

export class UserService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _teacherInfoService: TeacherInfoService;
    private _hashService: HashService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        teacherInfoService: TeacherInfoService,
        hashService: HashService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._teacherInfoService = teacherInfoService;
        this._hashService = hashService;
    }

    /**
     * Get user edit data 
     * @param editedUserId 
     * @returns 
     */
    async getEditUserDataAsync(editedUserId: number) {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.company', 'o')
            .leftJoinAndSelect('u.role', 'r')
            .leftJoinAndSelect('u.jobTitle', 'jt')
            .leftJoinAndSelect('u.teacherInfo', 'ti')
            .where('u.id = :userId', { userId: editedUserId })
            .getOneOrFail();

        return this._mapperService
            .map(User, UserEditDTO, user);
    }

    /**
     * Get user dto-s for the admin page user list.
     * 
     * @param searchText 
     * @returns 
     */
    async getAdminPageUsersListAsync(searchText: string | null) {

        const searchTextLower = searchText?.toLowerCase();

        const users = await this._ormService
            .getRepository(AdminUserListView)
            .createQueryBuilder('ualv')
            .getMany();

        const filteredUsers = searchTextLower
            ? users
                .filter(x => toFullName(x.firstName, x.lastName, 'hu')
                    .toLowerCase()
                    .includes(searchTextLower))
            : users;

        return this._mapperService
            .mapMany(AdminUserListView, AdminPageUserDTO, filteredUsers);
    }

    /**
     * Save user data which the user itself can edit.  
     * 
     * @param userId 
     * @param dto 
     */
    async saveUserSimpleAsync(userId: number, dto: UserEditSimpleDTO) {

        // save user 
        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                lastName: dto.lastName,
                firstName: dto.firstName,
                phoneNumber: dto.phoneNumber
            });
    }

    /**
     * Save user from admin page, where you can edit almost all fileds.
     * 
     * @param dto 
     */
    async saveUserAsync(dto: UserEditDTO) {

        const userId = dto.id;

        // save user 
        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                lastName: dto.lastName,
                firstName: dto.firstName,
                email: dto.email,
                isTeacher: dto.isTeacher,
                companyId: dto.company?.id,
                roleId: dto.role?.id,
                jobTitleId: dto.jobTitle?.id
            });

        // save teacher info
        const teacherInfo = await this._teacherInfoService
            .getTeacherInfoAsync(dto.id);

        // teacher info exists
        if (teacherInfo) {

            if (!dto.isTeacher) {

                await this._teacherInfoService
                    .deleteTeacherInfoAsync(teacherInfo.id);
            }
        }

        // teacher info doesn't exist
        else {

            if (!teacherInfo && dto.isTeacher) {

                await this._teacherInfoService
                    .createTeacherInfoAsync(userId);
            }
        }
    }

    /**
     * Get a very minimalistic user dto for displaying 
     * very minimal info about the user.
     * 
     * @param userId 
     * @returns 
     */
    async getBriefUserDataAsync(userId: number) {

        const user = await this._ormService
            .getRepository(User)
            .findOneOrFail({
                where: {
                    id: userId
                }
            });

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: getFullName(user)
        } as BriefUserDataDTO;
    }

    /**
     * Create a new user.
     * 
     * @param opts 
     * @returns 
     */
    createUserAsync = async (opts: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        registrationType: RegistrationType,
        companyId?: number,
        phoneNumber?: string,
        roleId?: number,
        jobTitleId?: number,
        invitationToken?: string
    }) => {

        const regType = opts.registrationType;

        // does user already exist?
        const existingUser = await this.getUserByEmailAsync(opts.email);
        if (existingUser)
            throw new ErrorCode('User already exists. Email: ' + opts.email, 'email_taken');

        // hash user password 
        const hashedPassword = await this._hashService
            .hashPasswordAsync(opts.password);

        // set default user fileds
        const user = {
            email: opts.email,
            firstName: opts.firstName,
            lastName: opts.lastName,
            jobTitleId: opts.jobTitleId,
            phoneNumber: opts.phoneNumber,
            companyId: opts.companyId,
            password: hashedPassword,
            isInvitationAccepted: false,
            isTrusted: regType === 'Invitation',
            registrationType: regType,
            invitationToken: opts.invitationToken
        } as User;

        // insert user
        await this._ormService
            .getRepository(User)
            .insert(user);

        const userId = user.id;

        // insert signup answer session
        await this._ormService
            .getRepository(AnswerSession)
            .insert({
                examId: 1, // 1 always points to signup exam 
                type: 'signup',
                userId: userId
            });

        // insert practise answer session
        await this._ormService
            .getRepository(AnswerSession)
            .insert({
                userId: userId,
                type: 'practise'
            });

        return user;
    };

    /**
     * Accept the invitation, 
     * whilst giving the user a password, for further logins.
     * 
     * @param userId 
     * @param rawPassword 
     */
    setUserInivitationDataAsync = async (userId: number, rawPassword: string,) => {

        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                isInvitationAccepted: true,
                password: await this._hashService
                    .hashPasswordAsync(rawPassword)
            });
    };

    /**
     * Get user entity by it's id.
     * 
     * @param userId 
     * @returns 
     */
    getUserById = async (userId: number) => {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :userId', { userId: userId })
            .leftJoinAndSelect('user.avatarFile', 'a')
            .leftJoinAndSelect('user.jobTitle', 'jt')
            .getOneOrFail();

        return user;
    };

    /**
     * Delete a user entity by it's id.
     * 
     * @param userId 
     * @param deletedUserId 
     * @returns 
     */
    deleteUserAsync = async (userId: number, deletedUserId: number) => {

        // TODO permissions

        const connectedCourses = await this._ormService
            .getRepository(Course)
            .find({
                where: {
                    teacherId: deletedUserId
                }
            });

        if (connectedCourses.length > 0)
            throw new ErrorCode('Cannot delete user when it\'s set as teacher on undeleted courses!', 'bad request');

        return await this._ormService
            .getRepository(User)
            .softDelete(deletedUserId);
    };

    /**
     * Get user dto by userId.
     * 
     * @param userId 
     * @returns 
     */
    getUserDTOById = async (userId: number) => {

        const foundUser = await this.getUserById(userId);
        if (!foundUser)
            return null;

        return this._mapperService
            .map(User, UserDTO, foundUser);
    };

    /**
     * Get user's active refresh token by userId.
     * 
     * @param userId 
     * @returns 
     */
    getUserRefreshTokenById = async (userId: number) => {

        const user = await this.getUserById(userId);
        if (!user)
            return null;

        return user.refreshToken;
    };

    /**
     * Get a user by it's email address. 
     * Which is also a unique identifier, like the id. 
     * 
     * @param email 
     * @returns 
     */
    getUserByEmailAsync = async (email: string) => {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email: email })
            .getOne();

        if (!user)
            return null;

        return user;
    };

    /**
     * Set user's avatar file id.
     * 
     * @param userId 
     * @param avatarFileId 
     */
    setUserAvatarFileId = async (userId: number, avatarFileId: number) => {

        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                avatarFileId: avatarFileId
            });
    };

    /**
     * Set user's refresh token.
     * 
     * @param userId 
     * @param refreshToken 
     * @returns 
     */
    setUserActiveRefreshToken = (userId: number, refreshToken: string) => {

        log(`Setting refresh token of user '${userId}' to '${refreshToken}'`);

        return this._ormService
            .getRepository(User)
            .save({
                id: userId,
                refreshToken: refreshToken
            });
    };

    /**
     * Set user's invitation token.
     * 
     * @param userId 
     * @param invitationToken 
     */
    setUserInvitationTokenAsync = async (userId: number, invitationToken: string) => {

        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                invitationToken
            });
    };

    /**
     * Remove user's refresh token, 
     * so it can't get a new activation token, 
     * even if it holds a valid refresh token on the client side.
     * 
     * @param userId 
     * @returns 
     */
    removeRefreshToken = (userId: number) => {

        return this._ormService
            .getRepository(User)
            .save({
                id: userId,
                refreshToken: ''
            });
    };

    /**
     * Get a list of the users marked as teacher.
     * 
     * @returns 
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