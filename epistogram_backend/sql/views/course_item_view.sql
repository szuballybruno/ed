SELECT 
	"m"."courseId" AS "courseId",
	"m"."name" AS "moduleName",
	"m"."orderIndex" AS "moduleOrderIndex",
	"m"."id" AS "moduleId",
	(SELECT encode(("m"."id" || '@module')::bytea, 'base64')) AS "moduleCode",
	"sq"."videoId",
	"sq"."examId",
	"sq"."itemIsVideo",
	"sq"."itemId",
	"sq"."itemOrderIndex",
	"sq"."itemTitle",
	"sq"."itemSubtitle",
	"sq"."itemCode"
FROM public."course_module" AS "m"

LEFT JOIN 
(
	-- video
	SELECT
		"v"."id" AS "videoId",
		NULL AS "examId",
		true AS "itemIsVideo",
		"v"."id" AS "itemId",
		"v"."moduleId" AS "moduleId",
		"v"."orderIndex" AS "itemOrderIndex",
		"v"."title" AS "itemTitle",
		"v"."subtitle" AS "itemSubtitle",
		(SELECT encode(("v"."id" || '@video')::bytea, 'base64')) AS "itemCode"
	FROM public."video" AS "v"

	UNION ALL

	-- exam
	SELECT 
		NULL AS "videoId",
		"e"."id" AS "examId",
		false AS "itemIsVideo",
		"e"."id" AS "itemId",
		"e"."moduleId" AS "moduleId",
		"e"."orderIndex" AS "itemOrderIndex",
		"e"."title" AS "itemTitle",
		"e"."subtitle" AS "itemSubtitle",
		(SELECT encode(("e"."id" || '@exam')::bytea, 'base64')) AS "itemCode"
	FROM public."exam" AS "e"
) AS "sq"
ON "sq"."moduleId" = "m"."id"

WHERE "m"."courseId" IS NOT NULL

ORDER BY 
	"m"."courseId", 
	"m"."orderIndex",
	"itemOrderIndex"