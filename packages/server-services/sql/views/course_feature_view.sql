SELECT
    fe.id AS feature_id,
    co.id AS course_id,
    fe.code AS feature_code,
    fe.description AS feature_description,
    fab.course_id IS NOT NULL AS is_enabled
FROM public.feature fe

CROSS JOIN public.course co

LEFT JOIN public.feature_assignment_bridge fab
ON fab.feature_id = fe.id
AND fab.course_id = co.id

WHERE fe.type = 'COURSE'

ORDER BY fe.id, co.id