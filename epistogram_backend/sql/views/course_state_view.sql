SELECT 
	"course"."id" AS "courseId",
	"user"."id" AS "userId",
	"ucb"."id" IS NOT NULL AS "isStarted",
	"ecv"."hasSuccessfulSession" AS "isComplete"
FROM public."course" 

LEFT JOIN public."user"
ON 1 = 1

LEFT JOIN public."exam_completed_view" AS "ecv"
ON "ecv"."courseId" = "course"."id"
	AND "ecv"."userId" = "user"."id"
	AND "ecv"."isFinalExam" = true
	
LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."userId" = "user"."id"
	AND "ucb"."courseId" = "course"."id"
	
ORDER BY 
	"user"."id",
	"course"."id"