SELECT 
	"c"."id" AS "id",
	"c"."title" AS "title",
	"cc"."id" AS "category_id",
	"cc"."name" AS "category_name",
	"scc"."id" AS "sub_category_id",
	"scc"."name" AS "sub_category_name",
	"t"."id" AS "teacher_id",
	"t"."first_name" AS "teacher_first_name",
	"t"."last_name" AS "teacher_last_name",
	"sf"."file_path" AS "cover_file_path",
	(SELECT COUNT("sq".*) 
		FROM (SELECT 
			  DISTINCT "video"."id" 
			  FROM public."video" 
			  WHERE "video"."course_id" = "c"."id") AS "sq") 
		AS "video_count",
	(SELECT COUNT("sq".*) 
		FROM (SELECT 
			  DISTINCT "exam"."id" 
			  FROM public."exam" 
			  WHERE "exam"."course_id" = "c"."id") AS "sq") 
		AS "exam_count"
FROM public."course" AS "c"

LEFT JOIN public."storage_file" AS "sf"
ON "sf"."id" = "c"."cover_file_id"

LEFT JOIN public."user" AS "t"
ON "t"."id" = "c"."teacher_id"

LEFT JOIN public."course_category" AS "cc"
ON "cc"."id" = "c"."category_id"

LEFT JOIN public."course_category" AS "scc"
ON "scc"."id" = "c"."sub_category_id"
	
ORDER BY
	"c"."id"