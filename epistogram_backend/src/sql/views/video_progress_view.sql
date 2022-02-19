SELECT
    "video"."id" AS "video_id",
    "user"."id" AS "user_id",
    CASE WHEN 
        MAX("vps"."to_seconds") IS NULL
        THEN 0
        ELSE MAX("vps"."to_seconds")
    END AS "to_seconds"
FROM public."video"

LEFT JOIN public."user" AS "user"
ON 1 = 1 

LEFT JOIN public."video_playback_sample" AS "vps"
ON "vps"."video_id" = "video"."id"
    AND "vps"."from_seconds" < 1
    
GROUP BY 
    "video"."id",
    "user"."id"
	
ORDER BY 
    "user"."id",
	"video"."id"

-- SELECT
-- 	"vps"."user_id" AS "user_id",
-- 	"video"."id" AS "video_id",
-- 	"vps"."from_seconds" AS "from_seconds",
-- 	"vps"."to_seconds" AS "to_seconds"
-- FROM public."video"

-- LEFT JOIN public."video_playback_sample" AS "vps"
-- ON "vps"."video_id" = "video"."id"

-- WHERE "vps"."from_seconds" < 1
-- LIMIT 1