SELECT 
	"sq".*,
	"m"."name" AS "moduleName",
	"m"."orderIndex" AS "moduleOrderIndex",
	(SELECT encode(("m"."id" || '@module')::bytea, 'base64')) AS "moduleCode"
FROM 
(
	-- video
	SELECT
		"v"."courseId",
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
		"e"."courseId",
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

	-- signup is excluded
	WHERE "e"."id" != 1  
) AS "sq"

LEFT JOIN public."course_module" AS "m"
ON "m"."id" = "sq"."moduleId"

ORDER BY 
	"sq"."courseId", 
	"moduleOrderIndex",
	"itemOrderIndex"