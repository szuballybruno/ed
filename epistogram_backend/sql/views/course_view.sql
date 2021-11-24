SELECT 
	"csv"."user_id" AS "user_id",
	"sf"."file_path" AS "file_path",
	"csv"."is_completed" AS "is_completed",
	"csv"."is_started" AS "is_started",
	"cc"."name" AS "category_name",
	"csc"."name" AS "sub_category_name",
	"ucb"."current_item_code" AS "current_item_code",
	"course".*
FROM public."course"

LEFT JOIN public."course_state_view" AS "csv"
ON "csv"."course_id" = "course"."id"

LEFT JOIN public."storage_file" AS "sf"
ON "sf"."id" = "course"."cover_file_id"

LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."user_id" = "csv"."user_id"
	AND "ucb"."course_id" = "course"."id"

LEFT JOIN public."course_item_all_view" AS "ciav"
ON "ciav"."course_id" = "course"."id"
	AND "ciav"."order_index" = 0
	
LEFT JOIN public."course_category" AS "cc"
ON "cc"."id" = "course"."category_id"
	
LEFT JOIN public."course_category" AS "csc"
ON "csc"."id" = "course"."sub_category_id"
	
ORDER BY 
	"course"."title" DESC,
	"csv"."user_id"


