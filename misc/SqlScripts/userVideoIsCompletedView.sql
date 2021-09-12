SELECT 
	"video"."id" AS "videoId",
	"user"."id" AS "userId",
	"view"."isVideoAnswered",
	"vpd"."watchedPercent",
	"vpd"."isWatched",
	CASE WHEN "vpd"."isWatched" = true 
		AND "view"."isVideoAnswered" 
		THEN 1 
		ELSE 0
	END AS "isComplete"
FROM public."video" AS "video"

LEFT JOIN public."user" AS "user"
ON 1 = 1

LEFT JOIN public."user_answer_session_view" AS "view"
ON "view"."userId" = "user"."id" 
	AND "view"."videoId" = "video"."id" 

LEFT JOIN public."video_playback_data" AS "vpd"
ON "vpd"."userId" = "user"."id" 
	AND "vpd"."videoId" = "video"."id" 