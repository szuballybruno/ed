SELECT 
	*,
	-- state
	CASE WHEN 
		"sq"."is_completed" = true
		THEN 'completed'
		ELSE CASE WHEN 
			"sq"."course_mode" = 'advanced'
				OR "sq"."order_index" = 0
			THEN 'available'
			ELSE CASE WHEN 
				LAG("sq"."is_completed", 1) OVER (
					PARTITION BY "sq"."course_id"
					ORDER BY 
						"sq"."user_id",
						"sq"."course_id",
						"sq"."order_index"
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
		"u"."id" AS "user_id",
		("vcv"."is_completed" OR "ecv"."has_successful_session") IS NOT DISTINCT FROM true AS "is_completed",
		"ucb"."course_mode" AS "course_mode"
	FROM public."course_item_view" AS "civ"

	LEFT JOIN public."user" AS "u"
	ON 1 = 1

	LEFT JOIN public."video_completed_view" AS "vcv"
	ON "vcv"."video_id" = "civ"."video_id"
		AND "vcv"."user_id" = "u"."id"

	LEFT JOIN public."exam_completed_view" AS "ecv"
	ON "ecv"."exam_id" = "civ"."exam_id"
		AND "ecv"."user_id" = "u"."id"

	LEFT JOIN public."user_course_bridge" AS "ucb"
	ON "ucb"."user_id" = "u"."id"
		AND "ucb"."course_id" = "civ"."course_id"

	ORDER BY 
		"user_id",
		"course_id", 
		"order_index"
) AS "sq"