import { PermissionCodeType as PermissionCodeTypeNew } from './PermissionCodesType';
import { Id } from './versionId';

export type InvitationTokenPayload = { userEmail: string };

export type ErrorCodeType =
    'forbidden' |
    'internal server error' |
    'bad request' |
    'http error' |
    'under maintenance' |
    'passwordInvalid' |
    'unknown' |
    'courseItemNotFound' |
    'activation_code_issue' |
    'deleted' |
    'email_taken' |
    'no permission';

// tasks
export type TaskObjectiveType = 'video' | 'playlist' | 'course' | 'exam';
export type TaskPriorityType = 'normal' | 'important' | 'urgent';
export type TaskStatusType = 'assigned' | 'inProgress' | 'submitted' | 'rejected' | 'completed';

export type CourseItemType = 'signup' | 'pretest' | 'video' | 'exam' | 'module' | 'final';
export type CourseItemSimpleType = 'video' | 'exam';

export type CourseItemStateType = 'completed' | 'locked' | 'current' | 'available';

export type SessionActivityType = 'login' | 'logout' | 'generic' | 'video' | 'exam';

export type CourseModeType = 'beginner' | 'advanced';

export type PermissionCodeType = PermissionCodeTypeNew;

export type CoinAcquireReasonType =
    'activity_streak_3_days' |
    'activity_streak_5_days' |
    'activity_streak_10_days' |
    'answer_streak_5' |
    'answer_streak_10' |
    'correct_answer';

export type PermissionScopeType = 'USER' | 'COMPANY' | 'COURSE' | 'COMMENT';

export type AnswerSessionType = 'signup' | 'exam' | 'practise' | 'pretest' | 'video';

export type CourseStageNameType = 'assigned' | 'prequiz' | 'pretest' | 'pretest_results' | 'watch' | 'finished';

export type TempomatModeType = 'auto' | 'light' | 'balanced' | 'strict';

export type EventCodeType = 'coin_acquire_answer_streak' | 'coin_acquire_session_streak' | 'lag_behind_notification';

export type CourseVisibilityType = 'public' | 'private';

export type RoleType = 'administrator' | 'supervisor' | 'user';

export type CourseRatingQuesitonType = 'rating_stars' | 'range_1_10' | 'free_text';

export type OrderType = 'nameASC' | 'nameDESC';

export type CourseContentItemIssueCodeType = 'questions_missing' | 'video_too_long' | 'ans_miss' | 'corr_ans_miss';

export const RoleIdEnum = {
    administrator: Id.create<'Role'>(1),
    supervisor: Id.create<'Role'>(2),
    user: Id.create<'Role'>(2),

    toRoleType(roleId: Id<'Role'>): RoleType {

        console.log(roleId);
        console.log(this.administrator);

        if (roleId === RoleIdEnum.administrator)
            return 'administrator';

        if (roleId === RoleIdEnum.supervisor)
            return 'supervisor';

        if (roleId === RoleIdEnum.user)
            return 'user';

        throw new Error('Invalid role id: ' + roleId);
    },

    toRoleId(roleType: RoleType) {

        if (roleType === 'administrator')
            return RoleIdEnum.administrator;

        if (roleType === 'supervisor')
            return RoleIdEnum.supervisor;

        if (roleType === 'user')
            return RoleIdEnum.user;

        throw new Error('Invalid role type: ' + roleType);
    }
};

export const JobTitleIdEnum = {
    genericUser: Id.create<'JobTitle'>(1),
    tester: Id.create<'JobTitle'>(2)
};

export const QuestionTypeEnum = {
    singleAnswer: 1,
    multipleAnswers: 2
};

export type TeacherBadgeNameType = 'badge1' | 'badge2' | 'badge3';

export type PasswordValidationIssueType = 'tooShort' | 'tooLong' | 'hasNoNumber' | 'doesNotMatchControlPassword' | 'passwordIsEmpty' | 'controlPasswordIsEmpty';