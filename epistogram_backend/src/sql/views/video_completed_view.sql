SELECT 
	"user"."id" AS "user_id",
	"video"."id" AS "video_id",
	"video"."course_id" AS "course_id",
	"video"."order_index" AS "order_index",
	"vpd"."watched_percent",
	"vpd"."is_watched" IS NOT DISTINCT FROM true AS "is_completed"
FROM public."video" AS "video"

LEFT JOIN public."user" AS "user"
ON 1 = 1

LEFT JOIN public."video_playback_data" AS "vpd"
ON "vpd"."user_id" = "user"."id" 
	AND "vpd"."video_id" = "video"."id" 