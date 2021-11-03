SELECT
	"uvcv"."userId",
	"uvcv"."courseId",
	"uvcv"."videoId",
	CAST (null AS integer) AS "examId",
	"uvcv"."isWatched" AS "isComplete",
	"uvcv"."orderIndex" AS "orderIndex"
FROM public.video_completed_view AS "uvcv"
UNION ALL
SELECT 
	"uecv"."userId",
	"uecv"."courseId",
	CAST (null AS integer) AS "videoId",
	"uecv"."examId",
	"uecv"."hasSuccessfulSession" AS "isComplete",
	"uecv"."orderIndex" AS "orderIndex"
FROM public.exam_completed_view AS "uecv"

ORDER BY 
	"userId",
	"courseId", 
	"orderIndex"