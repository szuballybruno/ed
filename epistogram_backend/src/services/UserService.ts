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
import { UserEngagementView } from '../models/views/UserEngagementView';
import moment from 'moment';
import { Grouping } from '../shared/logic/jsExtensions';
import { UserPerformanceView } from '../models/views/UserPerformanceView';

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
        invitationToken?: string,
        isGod?: boolean
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
            invitationToken: opts.invitationToken,
            isGod: !!opts.isGod
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

    getUserLearningOverviewDataAsync = async (userId: number) => {

        const userEngagementData: UserEngagementView[] = await this._ormService
            .getRepository(UserEngagementView)
            .createQueryBuilder('u')
            .where('u.userId = :userId', { userId })
            .getMany();

        // gets all the courses that the user started
        const startedCourses = userEngagementData
            .groupBy(x => x.courseId)
            .flatMap(x => ({
                courseId: x.first.courseId,
                creationDate: x.first.courseCreationDate,
                completedPercentage: x.first.completedPercentage,
                latestSessionEndDate: new Date(Math.max(...x.items.map(x => x.endDate)))
            }));

        // gets courses inactive for more than 14 days and not completed at least 50 percent
        const coursesInactiveFor14Days = startedCourses.filter(x => {
            const today = new Date();
            return x.latestSessionEndDate.getDate() < today.getDate() - 14 && x.completedPercentage < 50;
        });

        // gets only unique sessions
        const sessions = [
            ...new Map(userEngagementData
                .map(item =>
                    [item.sessionId, item]
                )
            )
                .values()
        ];

        /**
         * Extends objects of an array with yearWeek property by date key
         */
        const addWeekToArrayOfObjectsByKey = <T extends Object,>(
            arr: Array<T>,
            key: keyof T
        ): Array<T & { yearWeek: string }> => {

            return arr.map((session) => {

                // gets moment object from startDate
                const startDateMoment = moment(session[key]);

                // gets year and week from startDate
                const startDateYear = startDateMoment.year();
                const startDateWeek = startDateMoment.week();

                // create a composed key: 'year-week' 
                const yearWeek = `${startDateYear}-${startDateWeek}`;

                // adds yearWeek to sessions
                return {
                    ...session,
                    yearWeek
                };
            });
        };

        // sessions with weeks flat
        const sessionsWithWeeks = addWeekToArrayOfObjectsByKey(sessions, 'startDate');

        // sessions grouped by weeks
        const sessionByWeeks = sessionsWithWeeks
            .groupBy(x => x.yearWeek)
            .map(x => x.items);

        // count of all unique sessions
        const sessionCount = [
            ...new Map(userEngagementData
                .map(item =>
                    [item.sessionId, item]
                )
            )
                .values()
        ].length;

        // gets sessions longer than 15 minutes
        const getSessionsLongerThan15MinutesByWeek = (
            sessionsByWeek: (UserEngagementView & {
                yearWeek: string;
            })[][]
        ) => {
            return sessionByWeeks
                .map(oneWeekSessions => oneWeekSessions
                    .filter(x => (x.lengthSeconds / 60) > 15) // longer than 15 minutes
                );
        };

        // gets sessions shorter than 15 minutes
        const getSessionsShorterThan15MinutesByWeek = (
            sessionsByWeek: (UserEngagementView & {
                yearWeek: string;
            })[][]
        ) => {
            return sessionByWeeks
                .map(oneWeekSessions => oneWeekSessions
                    .filter(x => (x.lengthSeconds / 60) < 5) // shorter than 5 minutes
                );
        };

        // gets the total length of unique sessions in minute
        const getTotalSessionLengthMinutes = (sessions: UserEngagementView[]) => {
            return sessions
                .map(x => x.lengthSeconds / 60)
                .reduce((partialSum, a) => partialSum + a, 0);
        };

        const sessionsLongerThan15MinutesByWeek = getSessionsLongerThan15MinutesByWeek(sessionByWeeks);
        const sessionsShorterThan5MinutesByWeek = getSessionsShorterThan15MinutesByWeek(sessionByWeeks);
        const totalSessionLengthMinutes = getTotalSessionLengthMinutes(sessions);

        /**
         * Calculate engagement points from engagement data
         *  */
        const getEngagementPoints = (
            sessionCount: number,
            sessionsLongerThan15MinutesByWeeksCount: number[],
            sessionsShorterThan5MinutesByWeekCount: number[],
            totalSessionLengthMinutes: number,
            inactiveNotWatchedCoursesCount: number
        ): number => {
            let points = 0;

            /** 
             * Adds as many points as sessions until 10
             * After that it adds 10 points because you logged in more than 10 times,
             * and this is the maximum point
             * */
            sessionCount <= 10
                ? points += sessionCount
                : points += 10;

            /** 
             * Adds 5 points for every session longer than 15 minutes until 8 sessions. 
             * After that it adds 40 points because you have more long sessions than 8, 
             * and this is the maximum point which will be added.
             * 
             * Important: It calculates the points for every week first.
             * */
            sessionsLongerThan15MinutesByWeeksCount
                .map(x => {
                    x <= 8
                        ? x += x * 5
                        : x += 40;
                });

            /** 
             * Removes 3 points for every session shorter than 5 minutes until 5 sessions. 
             * After that it removes 15 points because you have more short sessions than 5, 
             * and this is the maximum point which will be deducted.
             * 
             * Important: It calculates the points for every week first.
             * */
            sessionsShorterThan5MinutesByWeekCount
                .map(x => {
                    x <= 5
                        ? x -= x * 3
                        : x -= 15;

                });

            /** 
             * Removes 10 points for every course that is:
             * - Started in the last 30 days AND
             * - Inactive for the last 14 days AND
             * - The progress is less than 50%
             * */
            points -= inactiveNotWatchedCoursesCount * 10;

            /** 
             * Adds different amounts of points by different 
             * ranges from the total session length. Max. 50 points.
             * */
            switch (true) {
                case totalSessionLengthMinutes > 0 && totalSessionLengthMinutes < 60:
                    points += 10;
                    break;

                case totalSessionLengthMinutes >= 60 && totalSessionLengthMinutes < 120:
                    points += 15;
                    break;

                case totalSessionLengthMinutes >= 120 && totalSessionLengthMinutes < 180:
                    points += 30;
                    break;

                case totalSessionLengthMinutes >= 180 && totalSessionLengthMinutes < 240:
                    points += 40;
                    break;

                case totalSessionLengthMinutes >= 240 && totalSessionLengthMinutes < 360:
                    points += 45;
                    break;

                case totalSessionLengthMinutes >= 360:
                    points += 50;
                    break;

                default:
                    points += 0;
            }

            return points;
        };

        const engagementPoints = getEngagementPoints(
            sessionCount,
            sessionsLongerThan15MinutesByWeek.map(x => x.length),
            sessionsShorterThan5MinutesByWeek.map(x => x.length),
            totalSessionLengthMinutes / 4,
            coursesInactiveFor14Days.length
        );

        const userPerformanceView = await this._ormService
            .getRepository(UserPerformanceView)
            .createQueryBuilder('upv')
            .where('upv.userId = :userId', { userId })
            .getMany();

        const practiseGivenAnswers = userPerformanceView.filter(x => x.givenAnswerType === 'practise');
        const videoGivenAnswers = userPerformanceView.filter(x => x.givenAnswerType === 'video');
        const examGivenAnswers = userPerformanceView.filter(x => x.givenAnswerType === 'exam');

        const getCorrectGivenAnswers = (givenAnswers: UserPerformanceView[]) => {
            return givenAnswers
                .reduce((a, b) => b.givenAnswerIsCorrect
                    ? a + 1
                    : a, 0);
        };

        const correctPractiseAnswers = getCorrectGivenAnswers(practiseGivenAnswers);
        const correctVideoAnswers = getCorrectGivenAnswers(videoGivenAnswers);
        const correctExamAnswers = getCorrectGivenAnswers(examGivenAnswers);

        const practiseAvgPercentage = Math.floor(correctPractiseAnswers / practiseGivenAnswers.length * 100);
        const videoAvgPercentage = Math.floor(correctVideoAnswers / videoGivenAnswers.length * 100);
        const examAvgPercentage = Math.floor(correctExamAnswers / examGivenAnswers.length * 100);

        const getPerformancePercentage = (
            practiseAvgPercentage: number,
            videoAvgPercentage: number,
            examAvgPercentage: number
        ) => {
            return (
                examAvgPercentage * 2.5 +
                videoAvgPercentage * 1.5 +
                practiseAvgPercentage
            ) / 5;
        };

        const performancePercentage = getPerformancePercentage(
            practiseAvgPercentage,
            videoAvgPercentage,
            examAvgPercentage
        );

        return {
            userPerformanceView,
            practiseAvgPercentage,
            videoAvgPercentage,
            examAvgPercentage,
            performancePercentage,
            engagementPoints
        };
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