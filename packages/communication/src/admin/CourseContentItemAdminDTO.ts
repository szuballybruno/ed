import { CourseItemType, VersionCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { AnswerEditDTO } from '../AnswerEditDTO';
import { Mutation } from '../mutations/Mutation';
import { QuestionEditDataReadDTO } from '../QuestionEditDataReadDTO';
import { CourseContentItemIssueDTO } from './CourseContentItemIssueDTO';

export class CourseContentItemAdminDTO {
	courseId: Id<'Course'>;
	moduleName: string;
	moduleOrderIndex: number;
	moduleVersionId: Id<'ModuleVersion'>;
	videoVersionId: Id<'VideoVersion'> | null;
	examVersionId: Id<'ExamVersion'> | null;
	itemOrderIndex: number;
	itemTitle: string;
	itemSubtitle: string;
	versionCode: VersionCode;
	errors: CourseContentItemIssueDTO[];
	warnings: CourseContentItemIssueDTO[];
	videoLength: number;
	videoAudioText: string;
	itemType: CourseItemType;
	questionMutations: Mutation<QuestionEditDataReadDTO, 'questionVersionId'>[];
	answerMutations: Mutation<AnswerEditDTO, 'answerVersionId'>[];
}