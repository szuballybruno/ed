import { JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { Exam } from "../Exam";
import { Video } from "../Video";

@ViewEntity({
    name: "course_item_state_view",
    expression: `
SELECT 
	"course"."id" AS "courseId",
	"user"."id" AS "userId",
	"civ"."videoId" AS "videoId",
	"civ"."isComplete" AS "isVideoCompleted",
	"civ"."examId" AS "examId",
	"civ"."isComplete" AS "isExamCompleted"
	
FROM public."course"

LEFT JOIN public."user" 
ON 1 = 1

LEFT JOIN public.course_item_view AS "civ"
ON "civ"."courseId" = "course"."id"
	AND "civ"."userId" = "user"."id"

ORDER BY "civ"."videoId","civ"."examId"
`
})
export class CourseItemStateView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    isVideoCompleted: boolean;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    isExamCompleted: boolean;

    // exam 
    @ManyToOne(_ => Exam)
    @JoinColumn({ name: "examId" })
    exam: Exam;

    // exam 
    @ManyToOne(_ => Video)
    @JoinColumn({ name: "videoId" })
    video: Video;
}