import { CourseItemType } from '../../types/sharedTypes';
import { CourseContentItemIssueDTO } from './CourseContentItemIssueDTO';

export class CourseContentItemAdminDTO {
	courseId: number;
	moduleName: string;
	moduleOrderIndex: number;
	moduleVersionId: number;
	videoVersionId: number;
	examVersionId: number;
	itemOrderIndex: number;
	itemTitle: string;
	itemSubtitle: string;
	versionCode: string;
	errors: CourseContentItemIssueDTO[];
	warnings: CourseContentItemIssueDTO[];
	videoLength: number;
	itemType: CourseItemType;
}