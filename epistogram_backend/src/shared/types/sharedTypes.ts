import * as DatabaseTypes from '../../models/DatabaseTypes';


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
    'email_taken';

// tasks
export type TaskObjectiveType = 'video' | 'playlist' | 'course' | 'exam';
export type TaskPriorityType = 'normal' | 'important' | 'urgent';
export type TaskStatusType = 'assigned' | 'inProgress' | 'submitted' | 'rejected' | 'completed';

export type ExamType = 'signup' | 'normal' | 'pretest' | 'final';

export type CourseItemType = ExamType | 'video' | 'exam' | 'module';

export type CourseItemStateType = 'completed' | 'locked' | 'current' | 'available';

export type SessionActivityType = 'login' | 'logout' | 'generic' | 'video' | 'exam';

export type CourseModeType = 'beginner' | 'advanced';

export type PermissionCodeType = DatabaseTypes.PermissionCodeType;

export type CoinAcquireReasonType =
    'activity_streak_3_days' |
    'activity_streak_5_days' |
    'activity_streak_10_days' |
    'answer_streak_5' |
    'answer_streak_10' |
    'correct_answer';

export type AnswerSessionType = 'signup' | 'normal' | 'practise' | 'pretest';


export type CourseStageNameType = 'prequiz' | 'pretest' | 'pretest_results' | 'watch' | 'finished';

export type TempomatModeType = 'auto' | 'light' | 'balanced' | 'strict'; 

export type EventCodeType = 'coin_acquire_answer_streak' | 'coin_acquire_session_streak' | 'lag_behind_notification';

export type CourseVisibilityType = 'public' | 'private';

export type RoleType = 'administrator' | 'supervisor' | 'user';

export type CourseRatingQuesitonType = 'rating_stars' | 'range_1_10' | 'free_text';

export type CourseContentItemIssueCodeType = 'questions_missing' | 'video_too_long' | 'ans_miss' | 'corr_ans_miss';

export const RoleIdEnum = {
    administrator: 1,
    supervisor: 2,
    user: 3,

    toRoleType(roleId: number): RoleType {

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
    genericUser: 1,
    tester: 2
};

export const QuestionTypeEnum = {
    singleAnswer: 1,
    multipleAnswers: 2
};

export type TeacherBadgeNameType = 'badge1' | 'badge2' | 'badge3';

export type PasswordValidationIssueType = 'tooShort' | 'tooLong' | 'hasNoNumber' | 'doesNotMatchControlPassword' | 'passwordIsEmpty' | 'controlPasswordIsEmpty';