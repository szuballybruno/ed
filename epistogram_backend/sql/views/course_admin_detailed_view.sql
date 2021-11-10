-- select encode('asd', 'base64') 

SELECT
	"sq".*,
	"sq"."videoId" IS NOT NULL AS "isVideo"
FROM 
(
	SELECT 
		"casv".*,
		"v"."id" AS "videoId",
		NULL AS "examId",
		"v"."id" AS "itemId",
		"v"."subtitle" AS "itemSubtitle",
		"v"."title" AS "itemTitle",
		"v"."orderIndex" AS "itemOrderIndex",
		"v"."lengthSeconds" AS "videoLength",
		(SELECT encode(("v"."id" || '@video')::bytea, 'base64')) AS "itemCode",
		(SELECT COUNT("q"."id") FROM public."question" AS "q" WHERE "q"."videoId" = "v"."id")::int AS "itemQuestionCount"
	FROM public."course_admin_short_view" AS "casv"

	LEFT JOIN public."video" AS "v"
	ON "v"."courseId" = "casv"."id"
	UNION ALL
	SELECT 
		"casv".*,
		NULL AS "videoId",
		"e"."id" AS "itemId",
		"e"."id" AS "examId",
		"e"."subtitle" AS "itemSubtitle",
		"e"."title" AS "itemTitle",
		"e"."orderIndex" AS "itemOrderIndex",
		NULL AS "videoLength",
		(SELECT encode(("e"."id" || '@exam')::bytea, 'base64')) AS "itemCode",
		(SELECT COUNT("q"."id") FROM public."question" AS "q" WHERE "q"."examId" = "e"."id")::int AS "itemQuestionCount"
	FROM public."course_admin_short_view" AS "casv"

	LEFT JOIN public."exam" AS "e"
	ON "e"."courseId" = "casv"."id"
) AS "sq"

ORDER BY 
	"sq"."id", 
	"sq"."itemOrderIndex"
