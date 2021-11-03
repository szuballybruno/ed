SELECT 
	"user"."id" AS "userId",
	"video"."id" AS "videoId",
	"video"."courseId" AS "courseId",
	"video"."orderIndex" AS "orderIndex",
	"vpd"."watchedPercent",
	"vpd"."isWatched" IS NOT DISTINCT FROM true AS "isCompleted"
FROM public."video" AS "video"

LEFT JOIN public."user" AS "user"
ON 1 = 1

LEFT JOIN public."video_playback_data" AS "vpd"
ON "vpd"."userId" = "user"."id" 
	AND "vpd"."videoId" = "video"."id" 