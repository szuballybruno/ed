SELECT 
	"user"."id" AS "userId",
	"course"."id" AS "courseId",
	"civ"."videoId" AS "videoId",
	CASE WHEN "civ"."isCompleted" = true 
		AND "civ"."videoId" IS NOT NULL
		THEN true 
		ELSE false 
	END AS "isVideoCompleted",
	"civ"."examId" AS "examId",
	CASE WHEN "civ"."isCompleted" = true 
		AND "civ"."examId" IS NOT NULL
		THEN true 
		ELSE false 
	END AS "isExamCompleted",
	"civ"."orderIndex" AS "orderIndex",
	"ucb"."courseMode" AS "courseMode",
	CASE WHEN 
		"civ"."isCompleted" = true
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

LEFT JOIN public."course_item_view" AS "civ"
ON "civ"."courseId" = "course"."id"
	AND "civ"."userId" = "user"."id"
	
ORDER BY 
	"user"."id",
	"civ"."courseId", 
	"orderIndex"