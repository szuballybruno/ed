SELECT 
	"csv"."userId" AS "userId",
	"sf"."filePath",
	"csv"."isComplete",
	"csv"."isStarted",
	"cc"."name" AS "categoryName",
	"csc"."name" AS "subCategoryName",
	
	-- current exam id
	CASE WHEN 
		"exam"."id" IS NULL
			AND "video"."id" IS NULL 
			AND "ciav"."examId" IS NOT NULL
		THEN "ciav"."examId"
		ELSE "exam"."id"
	END AS "currentExamId",
	
	-- current vide id
	CASE WHEN 
		"video"."id" IS NULL
			AND "exam"."id" IS NULL 
			AND "ciav"."videoId" IS NOT NULL
		THEN "ciav"."videoId"
		ELSE "video"."id"
	END AS "currentVideoId",
	"course".*
FROM public."course"

LEFT JOIN public."course_state_view" AS "csv"
ON "csv"."courseId" = "course"."id"

LEFT JOIN public."storage_file" AS "sf"
ON "sf"."id" = "course"."coverFileId"

LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."userId" = "csv"."userId"
	AND "ucb"."courseId" = "course"."id"

LEFT JOIN public."exam" 
ON "ucb"."currentExamId" = "exam"."id"
	AND "exam"."courseId" = "course"."id"

LEFT JOIN public."video" 
ON "ucb"."currentVideoId" = "video"."id"
	AND "video"."courseId" = "course"."id"

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


