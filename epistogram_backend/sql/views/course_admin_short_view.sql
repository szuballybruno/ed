SELECT 
	"c"."id" AS "id",
	"c"."title" AS "title",
	"cc"."id" AS "categoryId",
	"cc"."name" AS "categoryName",
	"scc"."id" AS "subCategoryId",
	"scc"."name" AS "subCategoryName",
	"t"."id" AS "teacherId",
	"t"."firstName" AS "teacherFirstName",
	"t"."lastName" AS "teacherLastName",
	"sf"."filePath" AS "coverFilePath",
	(SELECT COUNT("sq".*) 
		FROM (SELECT 
			  DISTINCT "video"."id" 
			  FROM public."video" 
			  WHERE "video"."courseId" = "c"."id") AS "sq") 
		AS "videoCount",
	(SELECT COUNT("sq".*) 
		FROM (SELECT 
			  DISTINCT "exam"."id" 
			  FROM public."exam" 
			  WHERE "exam"."courseId" = "c"."id") AS "sq") 
		AS "examCount"
FROM public."course" AS "c"

LEFT JOIN public."storage_file" AS "sf"
ON "sf"."id" = "c"."coverFileId"

LEFT JOIN public."user" AS "t"
ON "t"."id" = "c"."teacherId"

LEFT JOIN public."course_category" AS "cc"
ON "cc"."id" = "c"."categoryId"

LEFT JOIN public."course_category" AS "scc"
ON "scc"."id" = "c"."subCategoryId"
	
ORDER BY
	"c"."id"