SELECT 
	"casv".*,
	"civ".*,
	CASE WHEN "civ"."videoId" IS NULL
		THEN (SELECT COUNT("q"."id") FROM public."question" AS "q" WHERE "q"."examId" = "civ"."examId")::int
		ELSE (SELECT COUNT("q"."id") FROM public."question" AS "q" WHERE "q"."videoId" = "civ"."videoId")::int
	END  AS "itemQuestionCount",
	"v"."lengthSeconds" AS "videoLength"
FROM public."course_admin_short_view" AS "casv"

LEFT JOIN public."course_item_view" AS "civ"
ON "civ"."courseId" = "casv"."id"

LEFT JOIN public."video" AS "v"
ON "v"."id" = "civ"."videoId"

ORDER BY 
	"casv"."id", 
	"civ"."moduleOrderIndex",
	"civ"."itemOrderIndex"
