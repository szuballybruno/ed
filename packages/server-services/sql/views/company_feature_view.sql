SELECT
    fe.id AS feature_id,
    co.id AS company_id,
    fe.code AS feature_code,
    fe.description AS feature_description,
    fab.company_id IS NOT NULL AS is_enabled
FROM public.feature fe

CROSS JOIN public.company co

LEFT JOIN public.feature_assignment_bridge fab
ON fab.feature_id = fe.id
AND fab.company_id = co.id

WHERE fe.type = 'GENERIC'

ORDER BY fe.id, co.id