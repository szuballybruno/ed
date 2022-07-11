import { ViewColumn, ViewEntity } from "typeorm";
import { XViewColumn } from "../../services/XORM/XORMDecorators";
import { Id } from "../../shared/types/versionId";
import { Answer } from "../entity/answer/Answer";
import { CourseVersion } from "../entity/course/CourseVersion";
import { ExamVersion } from "../entity/exam/ExamVersion";
import { Question } from "../entity/question/Question";
import { QuestionData } from "../entity/question/QuestionData";
import { QuestionVersion } from "../entity/question/QuestionVersion";
import { VideoVersion } from "../entity/video/VideoVersion";

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class QuestionDataView {

    @ViewColumn()
    @XViewColumn()
    questionId: Id<Question>;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: Id<VideoVersion>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<ExamVersion>;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: Id<CourseVersion>;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<QuestionVersion>;

    @ViewColumn()
    @XViewColumn()
    questionDataId: Id<QuestionData>;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    imageUrl: string;

    @ViewColumn()
    @XViewColumn()
    showUpTimeSeconds: number;

    @ViewColumn()
    @XViewColumn()
    typeId: number;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<Answer>;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}