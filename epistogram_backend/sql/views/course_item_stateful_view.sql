SELECT 
	*,
	-- state
	CASE WHEN 
		"sq"."isCompleted" = true
		THEN 'completed'
		ELSE CASE WHEN 
			"sq"."courseMode" = 'advanced'
				OR "sq"."orderIndex" = 0
			THEN 'available'
			ELSE CASE WHEN 
				LAG("sq"."isCompleted", 1) OVER (
					PARTITION BY "sq"."courseId"
					ORDER BY 
						"sq"."userId",
						"sq"."courseId",
						"sq"."orderIndex"
				) IS NOT DISTINCT FROM true 
				THEN 'available'
				ELSE 'locked'
			END 
		END 
	END AS "state"
FROM 
(
	SELECT 
		"civ".*,
		"u"."id" AS "userId",
		("vcv"."isCompleted" OR "ecv"."hasSuccessfulSession") IS NOT DISTINCT FROM true AS "isCompleted",
		"ucb"."courseMode" AS "courseMode"
	FROM public."course_item_view" AS "civ"

	LEFT JOIN public."user" AS "u"
	ON 1 = 1

	LEFT JOIN public."video_completed_view" AS "vcv"
	ON "vcv"."videoId" = "civ"."videoId"
		AND "vcv"."userId" = "u"."id"

	LEFT JOIN public."exam_completed_view" AS "ecv"
	ON "ecv"."examId" = "civ"."examId"
		AND "ecv"."userId" = "u"."id"

	LEFT JOIN public."user_course_bridge" AS "ucb"
	ON "ucb"."userId" = "u"."id"
		AND "ucb"."courseId" = "civ"."courseId"

	ORDER BY 
		"userId",
		"courseId", 
		"orderIndex"
) AS "sq"