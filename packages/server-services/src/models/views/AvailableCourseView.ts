import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class AvailableCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    canView: boolean;

    @XViewColumn()
    filePath: string;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    isStarted: boolean;

    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    isFeatured: boolean;

    @XViewColumn()
    isRecommended: boolean;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    stageName: string;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    finalExamScorePercentage: number;

    @XViewColumn()
    teacherId: Id<'Teacher'>;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    totalVideoSumLengthSeconds: number;

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    difficulty: number;

    @XViewColumn()
    benchmark: number;
}