SELECT 
	"course"."id" AS "courseId",
	"user"."id" AS "userId",
	CAST ("ucb"."id" IS NOT NULL AS boolean) AS "isStarted",
	CASE WHEN
		
		-- SUM of incomplete items
		SUM(CASE WHEN 
				"ecv"."isCompleted" = true
					AND "ecv"."isFinalExam" = true
				THEN 1 
				ELSE 0 
			END) > 0
		THEN true
		ELSE false
	END AS "isComplete"
FROM public."course" 

LEFT JOIN public."user"
ON 1 = 1

LEFT JOIN public."exam_completed_view" AS "ecv"
ON "ecv"."courseId" = "course"."id"
	AND "ecv"."userId" = "user"."id"
	
LEFT JOIN public."user_course_bridge" AS "ucb"
ON "ucb"."userId" = "user"."id"
	AND "ucb"."courseId" = "course"."id"
	
GROUP BY 
	"course"."id",
	"user"."id",
	"ucb"."id"
	
ORDER BY 
	"user"."id",
	"course"."id"