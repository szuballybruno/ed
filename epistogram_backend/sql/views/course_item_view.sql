SELECT 
	"m"."course_id" AS "course_id",
	"m"."name" AS "module_name",
	"m"."order_index" AS "module_order_index",
	"m"."id" AS "module_id",
	(SELECT encode(("m"."id" || '@module')::bytea, 'base64')) AS "module_code",
	"sq"."video_id",
	"sq"."exam_id",
	"sq"."item_is_video",
	"sq"."item_id",
	"sq"."item_order_index",
	"sq"."item_title",
	"sq"."item_subtitle",
	"sq"."item_code"
FROM public."course_module" AS "m"

LEFT JOIN 
(
	-- video
	SELECT
		"v"."id" AS "video_id",
		NULL AS "exam_id",
		true AS "item_is_video",
		"v"."id" AS "item_id",
		"v"."module_id" AS "module_id",
		"v"."order_index" AS "item_order_index",
		"v"."title" AS "item_title",
		"v"."subtitle" AS "item_subtitle",
		(SELECT encode(("v"."id" || '@video')::bytea, 'base64')) AS "item_code"
	FROM public."video" AS "v"

	UNION ALL

	-- exam
	SELECT 
		NULL AS "video_id",
		"e"."id" AS "exam_id",
		false AS "item_is_video",
		"e"."id" AS "item_id",
		"e"."module_id" AS "module_id",
		"e"."order_index" AS "item_order_index",
		"e"."title" AS "item_title",
		"e"."subtitle" AS "item_subtitle",
		(SELECT encode(("e"."id" || '@exam')::bytea, 'base64')) AS "item_code"
	FROM public."exam" AS "e"
) AS "sq"
ON "sq"."module_id" = "m"."id"

WHERE "m"."course_id" IS NOT NULL

ORDER BY 
	"m"."course_id", 
	"m"."order_index",
	"item_order_index"