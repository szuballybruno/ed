import { AnswerSession } from "../models/entity/AnswerSession";
import { Course } from "../models/entity/Course";
import { User } from "../models/entity/User";
import { BriefUserDataDTO } from "../models/shared_models/BriefUserDataDTO";
import { RoleIdEnum } from "../models/shared_models/types/sharedTypes";
import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { RegistrationType } from "../models/Types";
import { getFullName, TypedError } from "../utilities/helpers";
import { MapperService } from "./MapperService2";
import { toAdminPageUserDTO, toUserDTO } from "./misc/mappings";
import { hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class UserService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    async getEditUserDataAsync(editedUserId: number) {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.organization", "o")
            .leftJoinAndSelect("u.role", "r")
            .leftJoinAndSelect("u.jobTitle", "jt")
            .where("u.id = :userId", { userId: editedUserId })
            .getOneOrFail();

        return this._mapperService
            .map(User, UserEditDTO, user);
    }

    async getAdminPageUsersListAsync() {

        const users = await this._ormService
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.organization", "org")
            .leftJoinAndSelect("user.tasks", "tasks")
            .leftJoinAndSelect("user.avatarFile", "sf")
            .leftJoinAndSelect("user.userActivity", "ua")
            .getMany();

        return users
            .map(x => toAdminPageUserDTO(x));
    }

    async saveUserAsync(dto: UserEditDTO) {

        await this._ormService
            .getRepository(User)
            .save({
                id: dto.id,
                lastName: dto.lastName,
                firstName: dto.firstName,
                email: dto.email,
                isTeacher: dto.isTeacher,
                organizationId: dto.organization?.id,
                roleId: dto.role?.id,
                jobTitleId: dto.jobTitle?.id,
            });
    }

    async getBriefUserDataAsync(userId: unknown) {

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

    createUserAsync = async (opts: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        registrationType: RegistrationType,
        organizationId?: number,
        phoneNumber?: string,
        roleId?: number,
        jobTitleId?: number,
        invitationToken?: string
    }) => {

        const regType = opts.registrationType;

        // does user already exist?
        const existingUser = await this.getUserByEmail(opts.email);
        if (existingUser)
            throw new TypedError("User already exists. Email: " + opts.email, "bad request");

        // hash user password 
        const hashedPassword = await hashPasswordAsync(opts.password);

        // set default user fileds
        const user = {
            email: opts.email,
            roleId: opts.roleId ?? RoleIdEnum.user,
            firstName: opts.firstName,
            lastName: opts.lastName,
            jobTitleId: opts.jobTitleId,
            phoneNumber: opts.phoneNumber,
            organizationId: opts.organizationId,
            password: hashedPassword,
            isInvitationAccepted: false,
            isTrusted: regType === "Invitation",
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
                examId: 1, // -- 1 always points to signup exam 
                isSignupAnswerSession: true,
                userId: userId
            });

        // insert practise answer session
        await this._ormService
            .getRepository(AnswerSession)
            .insert({
                userId: userId,
                isPractiseAnswerSession: true
            });

        return user;
    }

    setUserInivitationDataAsync = async (userId: number, rawPassword: string,) => {

        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                isInvitationAccepted: true,
                password: await hashPasswordAsync(rawPassword)
            });
    }

    getUserById = async (userId: number) => {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.id = :userId", { userId: userId })
            .leftJoinAndSelect("user.avatarFile", "a")
            .leftJoinAndSelect("user.userActivity", "ua")
            .leftJoinAndSelect("user.jobTitle", "jt")
            .getOneOrFail();

        return user;
    }

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
            throw new TypedError("Cannot delete user when it's set as teacher on undeleted courses!", "bad request");

        return await this._ormService
            .getRepository(User)
            .softDelete(deletedUserId);
    }

    getUserDTOById = async (userId: number) => {

        const foundUser = await this.getUserById(userId);
        if (!foundUser)
            return null;

        return toUserDTO(foundUser);
    }

    getUserActiveTokenById = async (userId: number) => {

        //const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;

        const foundUser = await this.getUserById(userId);
        if (!foundUser)
            return null;

        return foundUser.refreshToken;
    }

    getUserByEmail = async (email: string) => {

        const user = await this._ormService
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();

        if (!user)
            return null;

        return user;
    }

    setUserAvatarFileId = async (userId: number, avatarFileId: number) => {

        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                avatarFileId: avatarFileId
            });
    }

    setUserActiveRefreshToken = (userId: number, refreshToken: string) => {

        log(`Setting refresh token of user '${userId}' to '${refreshToken}'`);

        return this._ormService
            .getRepository(User)
            .save({
                id: userId,
                refreshToken: refreshToken
            });
    }

    setUserInvitationTokenasync = async (userId: number, invitationToken: string) => {

        await this._ormService
            .getRepository(User)
            .save({
                id: userId,
                invitationToken
            });
    }

    removeRefreshToken = (userId: number) => {

        return this._ormService
            .getRepository(User)
            .save({
                id: userId,
                refreshToken: ""
            });
    }

    getTeacherDTOAsync = async () => {

        const teachers = await this._ormService
            .getRepository(User)
            .find();

        return teachers
            .map(x => toUserDTO(x));
    }
}