SELECT 
	"course"."id" AS "courseId",
	"user"."id" AS "userId",
	CASE WHEN
		
		-- SUM of incomplete items
		SUM(CASE WHEN 
				"cisv"."state" <> 'completed' 
				THEN 1 
				ELSE 0 
			END) > 0
		THEN false
		ELSE true 
	END AS "isComplete"
FROM public."course" 

LEFT JOIN public."user"
ON 1 = 1

LEFT JOIN public."course_item_state_view" AS "cisv"
ON "cisv"."courseId" = "course"."id"
	AND "cisv"."userId" = "user"."id"
	
GROUP BY 
	"course"."id",
	"user"."id"