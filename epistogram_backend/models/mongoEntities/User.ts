
import { IdType } from "../shared_models/types/sharedTypes";

export type User = {
    _id: IdType;
    userData: UserData;
    userStatistics: UserStatistics;
    activities: Activity[];
}

export interface AddedDate {
    $numberLong: string;
}

export interface Due {
    $numberLong: string;
}

export interface Task {
    addedDate: AddedDate;
    name: string;
    addedBy: string;
    due: Due;
    status: string;
}

export interface Group {
    groupId: string;
    groupRole: string;
}

export interface Note {
    title: string;
    data: string;
}

export interface Notifications {
    newRecommendedCourses: boolean;
    newCourses: boolean;
    examResult: boolean;
    news: boolean;
    newExamDone: boolean;
    newReportAvailable: boolean;
    helpRequest: boolean;
}

export interface AllowedMachine {
    ipAddress: string;
}

export interface Security {
    twoFactorAuth: boolean;
    allowedMachines: AllowedMachine[];
}

export interface View {
    theme: string;
    accessabilityMode: boolean;
    lessDataTraffic: boolean;
}

export interface UserData {
    active: boolean;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userDescription: string;
    linkedInUrl: string;
    role: string;
    innerRole: string;
    password: string;
    organizationId: string;
    currentCourseId: string;
    tasks: Task[];
    groups: Group[];
    notes: Note[];
    notifications: Notifications;
    security: Security;
    view: View;
    badges: string[];
    currentItemId: string;
    refreshToken: string;
}

export interface CourseStartDate {
    $date: Date;
}

export interface Cours {
    _id: IdType;
    courseStartDate: CourseStartDate;
}

export interface Usage {
}

export interface Exam {
    _id: IdType;
}

export interface Tag {
    _id: IdType;
    count: number;
}

export interface UserStatistics {
    videos: string[];
    courses: Cours[];
    votes: string[];
    usage: Usage;
    exams: Exam[];
    tags: Tag[];
}

export interface Activity {
    createdAt: number;
    activityType: string;
    actionType: string;
    actionTriggererURL: string;
    actionTriggererItemName: string;
    actionTriggererItemLabel: string;
    actionTriggererItemKey: string;
    nextStateType: string;
    nextStateURL: string;
    description: string;
}


