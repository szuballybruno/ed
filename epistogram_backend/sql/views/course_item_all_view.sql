SELECT 
	"course"."id" AS "courseId",
	"civ"."videoId",
	"civ"."examId",
	"civ"."orderIndex"
FROM public."course" 

LEFT JOIN (
	SELECT
		"video"."courseId",
		"video"."id"  AS "videoId",
		CAST (null AS integer) AS "examId",
		"video"."orderIndex" AS "orderIndex"
	FROM public."video"
	UNION ALL
	SELECT 
		"exam"."courseId",
		CAST (null AS integer) AS "videoId",
		"exam"."id" AS "examId", 
		"exam"."orderIndex" AS "orderIndex"
	FROM public."exam"
) AS "civ"
ON "civ"."courseId" = "course"."id"

ORDER BY "courseId", "orderIndex"