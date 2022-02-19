SELECT 
	"course"."id" AS "course_id",
	"civ"."video_id",
	"civ"."exam_id",
	"civ"."order_index"
FROM public."course" 

LEFT JOIN (
	SELECT
		"video"."course_id",
		"video"."id"  AS "video_id",
		CAST (null AS integer) AS "exam_id",
		"video"."order_index" AS "order_index"
	FROM public."video"
	UNION ALL
	SELECT 
		"exam"."course_id",
		CAST (null AS integer) AS "video_id",
		"exam"."id" AS "exam_id", 
		"exam"."order_index" AS "order_index"
	FROM public."exam"
) AS "civ"
ON "civ"."course_id" = "course"."id"

ORDER BY "course_id", "order_index"