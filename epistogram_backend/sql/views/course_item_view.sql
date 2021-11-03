SELECT
	"uvcv"."userId",
	"uvcv"."courseId",
	"uvcv"."videoId",
	CAST (null AS integer) AS "examId",
	"uvcv"."isCompleted" AS "isCompleted",
	"uvcv"."orderIndex" AS "orderIndex"
FROM public.video_completed_view AS "uvcv"
UNION ALL
SELECT 
	"uecv"."userId",
	"uecv"."courseId",
	CAST (null AS integer) AS "videoId",
	"uecv"."examId",
	"uecv"."hasSuccessfulSession" AS "isCompleted",
	"uecv"."orderIndex" AS "orderIndex"
FROM public.exam_completed_view AS "uecv"

ORDER BY 
	"userId",
	"courseId", 
	"orderIndex"