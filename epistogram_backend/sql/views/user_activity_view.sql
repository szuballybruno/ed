SELECT 
	"user"."id" AS "userId", 
	"role"."id" AS "roleId",
	"role"."name" AS "roleName",
	"activity"."id" AS "activityId",
	"activity"."name" AS "activityName"
FROM public."user"

LEFT JOIN public."role"
	ON "role"."id" = "user"."roleId"

LEFT JOIN public."role_activity_bridge" AS "rab"
	ON "rab"."roleId" = "role"."id"
		AND  "role"."id" <> 1 -- ignore bridges if roledId = Administrator 

LEFT JOIN public."user_signup_completed_view" AS "uscv"
	ON "uscv"."userId" = "user"."id"

LEFT JOIN public."activity"
	ON "rab"."activityId" = "activity"."id"

	-- join all if roledId = Administrator
	OR "role"."id" = 1 

	--if signup is completed	
	OR ("activity"."id" = 4 AND "uscv"."isSignupComplete" AND "user"."isTrusted")
