WITH 
sq as 
(
    SELECT 
        ucb.*,
        ucb.id IS NOT NULL has_bridge,
        ccv.user_id IS NOT NULL is_completed
    FROM public.course co

    CROSS JOIN public.user u

    LEFT JOIN public.course_completion_view ccv
    ON ccv.course_id = co.id
    AND ccv.user_id = u.id
        
    INNER JOIN public.user_course_bridge ucb
    ON ucb.user_id = u.id
    AND ucb.course_id = co.id
)
SELECT 
    sq.*,
    --COALESCE(sq.is_current, false) is_current,
    sq.has_bridge = true AND sq.is_completed = false in_progress
FROM sq
    
ORDER BY 
    sq.user_id,
    sq.course_id