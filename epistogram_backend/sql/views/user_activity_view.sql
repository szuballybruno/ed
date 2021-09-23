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

LEFT JOIN public."activity"
ON "rab"."activityId" = "activity"."id"