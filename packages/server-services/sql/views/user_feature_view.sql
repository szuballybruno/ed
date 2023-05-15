SELECT
    fab.id assignment_bridge_id,
    fab.user_id,
    fab.company_id,
    fab.course_id,
	fab.is_deassigning,
    fe.id feature_id,
    fe.code feature_code
FROM public.feature_assignment_bridge fab

INNER JOIN public.feature fe
ON fe.id = fab.feature_id