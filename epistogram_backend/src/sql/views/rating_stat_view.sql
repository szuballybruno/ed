select 
	u.id user_id,
	u.email user_email,
	u.first_name || ' ' || u.last_name user_name,
	co.id coruse_id,
	co.title course_title,
	v.title video_title,
	vr.experience,
	vr.difficulty
from public.video_rating vr

LEFT JOIN public.user u
ON u.id = vr.user_id

LEFT JOIN public.video v
ON v.id = vr.video_id

LEFT JOIN public.course co 
ON co.id = v.course_id

WHERE u.company_id = 1

ORDER BY 
	u.id,
	co.id,
	v.id