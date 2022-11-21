SELECT
    ucb.* 
FROM 
(
    SELECT 
        ucb.user_id,
        MAX(ucb.last_interaction_date) max_lid
    FROM public.user_course_bridge ucb
    GROUP BY ucb.user_id
) sq
INNER JOIN public.user_course_bridge ucb
ON ucb.last_interaction_date = sq.max_lid
AND ucb.user_id = sq.user_id