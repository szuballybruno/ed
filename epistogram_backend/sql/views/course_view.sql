SELECT 
	"csv"."userId" AS "userId",
	"sf"."filePath" AS "filePath",
	"csv"."isCompleted" AS "isCompleted",
	"csv"."isStarted" AS "isStarted",
	"cc"."name" AS "categoryName",
	"csc"."name" AS "subCategoryName",
	"ucb"."currentItemCode" AS "currentItemCode",
	"course".*
FROM public."course"

LEFT JOIN public."course_state_view" AS "csv"
ON "csv"."courseId" = "course"."id"

LEFT JOIN public."storage_file" AS "sf"
ON "sf"."id" = "course"."coverFileId"

LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."userId" = "csv"."userId"
	AND "ucb"."courseId" = "course"."id"

LEFT JOIN public."course_item_all_view" AS "ciav"
ON "ciav"."courseId" = "course"."id"
	AND "ciav"."orderIndex" = 0
	
LEFT JOIN public."course_category" AS "cc"
ON "cc"."id" = "course"."categoryId"
	
LEFT JOIN public."course_category" AS "csc"
ON "csc"."id" = "course"."subCategoryId"
	
ORDER BY 
	"course"."title" DESC,
	"csv"."userId"


