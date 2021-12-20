SELECT 
	"casv".*,
	"civ".*,
	CASE WHEN "civ"."video_id" IS NULL
		THEN (SELECT COUNT("q"."id") FROM public."question" AS "q" WHERE "q"."exam_id" = "civ"."exam_id")::int
		ELSE (SELECT COUNT("q"."id") FROM public."question" AS "q" WHERE "q"."video_id" = "civ"."video_id")::int
	END  AS "item_question_count",
	"v"."length_seconds" AS "video_length"
FROM public."course_admin_short_view" AS "casv"

LEFT JOIN public."course_item_view" AS "civ"
ON "civ"."course_id" = "casv"."id"

LEFT JOIN public."video" AS "v"
ON "v"."id" = "civ"."video_id"

ORDER BY 
	"casv"."id", 
	"civ"."module_order_index",
	"civ"."item_order_index"
