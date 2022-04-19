SELECT 
	u.id user_id,
	u.is_invitation_accepted,
	u.is_trusted,
	u.registration_type,
	u.email,
	u.first_name,
	u.last_name,
	u.role_id,
	u.company_id,
	o.name company_name,
	u.job_title_id,
	jt.name job_title_name,
	ulav.latest_activity_date,
	ulav.total_spent_seconds,
	EXTRACT(epoch FROM ulav.total_spent_seconds)::int total_spent_seconds_seconds,
	sf.file_path avatar_file_path,
	uafv.can_access_application,
	cbv.coin_balance
FROM public.user u 

LEFT JOIN public.storage_file sf
ON sf.id = u.avatar_file_id

LEFT JOIN public.company o
ON o.id = u.company_id

LEFT JOIN public.job_title jt
ON jt.id = u.job_title_id

LEFT JOIN public.user_latest_activity_view ulav
ON ulav.id = u.id

LEFT JOIN public.user_activity_flat_view uafv
ON uafv.user_id = u.id

LEFT JOIN public.coin_balance_view cbv
ON cbv.user_id = u.id

WHERE u.deletion_date IS NULL

ORDER BY ulav.latest_activity_date DESC NULLS LAST