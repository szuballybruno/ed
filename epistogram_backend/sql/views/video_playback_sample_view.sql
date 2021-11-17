SELECT 
	"vps"."id",
	"vps"."videoId",
	"vps"."userId",
	"vps"."fromSeconds",
	"vps"."toSeconds",
	ROUND (("vps"."toSeconds" - "vps"."fromSeconds")::numeric, 3) AS "totalPlaybackDuration"
FROM public."video_playback_sample" AS "vps"
