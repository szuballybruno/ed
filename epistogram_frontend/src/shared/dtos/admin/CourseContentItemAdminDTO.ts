import { CourseItemType } from "../../types/sharedTypes";
import { CourseContentItemIssueDTO } from "./CourseContentItemIssueDTO";

export class CourseContentItemAdminDTO {
	courseId: number;
	moduleName: string;
	moduleOrderIndex: number;
	moduleId: number;
	moduleCode: string;
	videoId: number;
	examId: number;
	itemId: number;
	itemOrderIndex: number;
	itemTitle: string;
	itemSubtitle: string;
	itemCode: string;
	errors: CourseContentItemIssueDTO[];
	warnings: CourseContentItemIssueDTO[];
	videoLength: number;
	itemType: CourseItemType;
}