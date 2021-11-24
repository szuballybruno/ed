SELECT 
	"user"."id" AS "user_id", 
	"role"."id" AS "role_id",
	"role"."name" AS "role_name",
	"activity"."id" AS "activity_id",
	"activity"."name" AS "activity_name"
FROM public."user"

LEFT JOIN public."role"
	ON "role"."id" = "user"."role_id"

LEFT JOIN public."role_activity_bridge" AS "rab"
	ON "rab"."role_id" = "role"."id"
		AND  "role"."id" <> 1 -- ignore bridges if roled_id = _administrator 

LEFT JOIN public."signup_completed_view" AS "uscv"
	ON "uscv"."user_id" = "user"."id"

LEFT JOIN public."activity"
	ON "rab"."activity_id" = "activity"."id"

	-- join all if roled_id = _administrator
	OR "role"."id" = 1 

	--if signup is completed	
	OR ("activity"."id" = 4 AND "uscv"."is_signup_complete" AND "user"."is_trusted")
