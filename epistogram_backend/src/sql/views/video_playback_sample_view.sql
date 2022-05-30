SELECT 
	"vps"."id",
	"vps"."video_id",
	"vps"."user_id",
	"vps"."from_seconds",
	"vps"."to_seconds",
	"vps"."creation_date",
	ROUND (("vps"."to_seconds" - "vps"."from_seconds")::numeric, 3) AS "total_playback_duration"
FROM public."video_playback_sample" AS "vps"
