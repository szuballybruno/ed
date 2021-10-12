SELECT
	"uav"."userId", 
	"uav"."roleId",
	"uav"."roleName",
	
	CAST (MAX(CASE WHEN "uav"."activityId" = 1 THEN 1 ELSE 0 END) AS boolean)
	AS "canSetInvitedUserOrganization",
	
	CAST (MAX(CASE WHEN "uav"."activityId" = 2 THEN 1 ELSE 0 END) AS boolean)
	AS "canAccessCourseAdministration",
	
	CAST (MAX(CASE WHEN "uav"."activityId" = 3 THEN 1 ELSE 0 END) AS boolean)
	AS "canAccessAdministration",
	
	CAST (MAX(CASE WHEN "uav"."activityId" = 4 THEN 1 ELSE 0 END) AS boolean)
	AS "canAccessApplication"

FROM "user_activity_view" AS "uav"
	
GROUP BY
	"uav"."userId", 
	"uav"."roleId",
	"uav"."roleName"