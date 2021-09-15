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