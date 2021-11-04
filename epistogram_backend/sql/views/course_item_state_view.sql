SELECT 
	"user"."id" AS "userId",
	"course"."id" AS "courseId",
	"ucb"."courseMode" AS "courseMode",
	"civ"."orderIndex" AS "orderIndex",
	"civ"."videoId" AS "videoId",
	"civ"."examId" AS "examId",

	-- isVideoCompleted
	CASE WHEN "civ"."isCompleted" = true 
		AND "civ"."videoId" IS NOT NULL
		THEN true 
		ELSE false 
	END AS "isVideoCompleted",
	
	-- isExamCompleted
	CASE WHEN "civ"."isCompleted" = true 
		AND "civ"."examId" IS NOT NULL
		THEN true 
		ELSE false 
	END AS "isExamCompleted",
	
	-- state
	CASE WHEN 
		"civ"."isCompleted" = true
		THEN 'completed'
		ELSE CASE WHEN 
			"ucb"."courseMode" = 'advanced'
				OR "civ"."orderIndex" = 0
			THEN 'available'
			ELSE CASE WHEN 
				LAG("civ"."isCompleted", 1) OVER (
					PARTITION BY "course"."id"
					ORDER BY 
						"civ"."userId",
						"civ"."courseId",
						"civ"."orderIndex"
				) IS NOT DISTINCT FROM true 
				THEN 'available'
				ELSE 'locked'
			END 
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