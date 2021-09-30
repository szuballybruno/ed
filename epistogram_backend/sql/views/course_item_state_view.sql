SELECT 
	"course"."id" AS "courseId",
	"user"."id" AS "userId",
	"civ"."videoId" AS "videoId",
	"civ"."isComplete" AS "isVideoCompleted",
	"civ"."examId" AS "examId",
	"civ"."isComplete" AS "isExamCompleted",
	"civ"."orderIndex" AS "orderIndex",
	"ucb"."courseMode" AS "courseMode",
	CASE WHEN 
		"civ"."isComplete" = true
		THEN 'completed'
		ELSE CASE WHEN 
			"ucb"."courseMode" = 'advanced'
				OR "civ"."orderIndex" = 0
			THEN 'available'
			ELSE 'locked'
		END 
	END AS "state"
	
FROM public."course"

LEFT JOIN public."user" 
ON 1 = 1

LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."userId" = "user"."id"
	AND "ucb"."courseId" = "course"."id"

LEFT JOIN public.course_item_view AS "civ"
ON "civ"."courseId" = "course"."id"
	AND "civ"."userId" = "user"."id"
	
ORDER BY "civ"."courseId", "orderIndex"