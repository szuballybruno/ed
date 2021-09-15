CREATE VIEW course_item_view
AS
SELECT
	"uvcv"."userId",
	"uvcv"."courseId",
	"uvcv"."videoId",
	CAST (null AS integer) AS "examId",
	"uvcv"."isComplete" AS "isComplete"
FROM public.video_completed_view AS "uvcv"
UNION ALL
SELECT 
	"uecv"."userId",
	"uecv"."courseId",
	CAST (null AS integer) AS "videoId",
	"uecv"."examId",
	"uecv"."isCompleted" AS "isComplete"
FROM public.exam_completed_view AS "uecv"