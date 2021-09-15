SELECT
	"vps"."userId" AS "userId",
	"video"."id" AS "videoId",
	"vps"."fromSeconds" AS "fromSeconds",
	"vps"."toSeconds" AS "toSeconds"
FROM public."video"

LEFT JOIN public."video_playback_sample" AS "vps"
ON "vps"."videoId" = "video"."id"

WHERE "vps"."fromSeconds" < 1
LIMIT 1