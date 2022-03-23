import { CourseContentItemIssueDTO } from "./CourseContentItemIssueDTO";

export class CourseContentItemAdminDTO {
    courseId: number;
    courseTitle: string;
	moduleName: string;
	moduleOrderIndex: number;
	moduleId: number;
	moduleCode: string;
	videoId: number;
	examId: number;
	itemIsVideo: boolean;
	itemId: number;
	itemOrderIndex: number;
	itemTitle: string;
	itemSubtitle: string;
	itemIsFinalExam: boolean;
	itemCode: string;
	errors: CourseContentItemIssueDTO[];
	warnings: CourseContentItemIssueDTO[];
	videoLength: number;
}