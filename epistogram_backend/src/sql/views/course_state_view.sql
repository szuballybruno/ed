SELECT 
	"course"."id" AS "course_id",
	"user"."id" AS "user_id",
	"ucb"."id" IS NOT NULL AS "is_started",
	"ecv"."has_successful_session" AS "is_completed"
FROM public."course" 

LEFT JOIN public."user"
ON 1 = 1

LEFT JOIN public."exam_completed_view" AS "ecv"
ON "ecv"."course_id" = "course"."id"
	AND "ecv"."user_id" = "user"."id"
	AND "ecv"."is_final_exam" = true
	
LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."user_id" = "user"."id"
	AND "ucb"."course_id" = "course"."id"
	
ORDER BY 
	"user"."id",
	"course"."id"