CREATE VIEW video_progress_view 
AS
SELECT
    "video"."id" AS "videoId",
    "user"."id" AS "userId",
    CASE WHEN 
        MAX("vps"."toSeconds") IS NULL
        THEN 0
        ELSE MAX("vps"."toSeconds")
    END AS "toSeconds"
FROM public."video"

LEFT JOIN public."user" AS "user"
ON 1 = 1 

LEFT JOIN public."video_playback_sample" AS "vps"
ON "vps"."videoId" = "video"."id"
    AND "vps"."fromSeconds" < 1
    
GROUP BY 
    "video"."id",
    "user"."id"

-- SELECT
-- 	"vps"."userId" AS "userId",
-- 	"video"."id" AS "videoId",
-- 	"vps"."fromSeconds" AS "fromSeconds",
-- 	"vps"."toSeconds" AS "toSeconds"
-- FROM public."video"

-- LEFT JOIN public."video_playback_sample" AS "vps"
-- ON "vps"."videoId" = "video"."id"

-- WHERE "vps"."fromSeconds" < 1
-- LIMIT 1