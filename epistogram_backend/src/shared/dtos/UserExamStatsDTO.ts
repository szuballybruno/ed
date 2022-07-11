import { Course } from "../../models/entity/course/Course";
import { Exam } from "../../models/entity/exam/Exam";
import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class UserExamStatsDTO {
    userId: Id<'User'>;
    examId: Id<'Exam'>;
    examTitle: string;
    courseId: Id<'Course'>;
    correctAnswerRate: number;
    shouldPractiseExam: boolean;
    correctAnswerCount: string;
    examLengthSeconds: number;
    lastCompletionDate: Date;
    averageReactionTime: number;
}