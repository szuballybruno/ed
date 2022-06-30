import { CourseItemType } from '../../types/sharedTypes';
import { Mutation } from '../mutations/Mutation';
import { QuestionEditDataDTO } from '../QuestionEditDataDTO';
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
	questionMutations: Mutation<QuestionEditDataDTO, 'questionVersionId'>[];
}