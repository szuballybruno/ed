import { CourseItemType } from '../../types/sharedTypes';
import { VersionCode } from '../../types/versionCode';
import { AnswerEditDTO } from '../AnswerEditDTO';
import { Mutation } from '../mutations/Mutation';
import { QuestionEditDataDTO } from '../QuestionEditDataDTO';
import { CourseContentItemIssueDTO } from './CourseContentItemIssueDTO';

export class CourseContentItemAdminDTO {
	courseId: number;
	moduleName: string;
	moduleOrderIndex: number;
	moduleVersionId: number;
	videoVersionId: number | null;
	examVersionId: number | null;
	itemOrderIndex: number;
	itemTitle: string;
	itemSubtitle: string;
	versionCode: VersionCode;
	errors: CourseContentItemIssueDTO[];
	warnings: CourseContentItemIssueDTO[];
	videoLength: number;
	itemType: CourseItemType;
	questionMutations: Mutation<QuestionEditDataDTO, 'questionVersionId'>[];
	answerMutations: Mutation<AnswerEditDTO, 'answerVersionId'>[];
}