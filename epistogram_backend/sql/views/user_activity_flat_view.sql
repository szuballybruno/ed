SELECT
	uav.user_id, 
	uav.role_id,
	uav.role_name,

	BOOL_OR(uav.activity_id = 1) can_set_invited_user_organization,
	BOOL_OR(uav.activity_id = 2) can_access_course_administration,
	BOOL_OR(uav.activity_id = 3) can_access_administration,
	BOOL_OR(uav.activity_id = 4) can_access_application,
	BOOL_OR(uav.activity_id = 5) can_access_shop_administration

FROM user_activity_view AS uav
	
GROUP BY
	uav.user_id, 
	uav.role_id,
	uav.role_name