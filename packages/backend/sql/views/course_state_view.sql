WITH 
sq as 
(
    SELECT 
        ucb.*,
        cucbv.id IS NOT NULL is_current,
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

    LEFT JOIN public.current_user_course_bridge_view cucbv
    ON cucbv.id = ucb.id
)
SELECT 
    sq.*,
    sq.has_bridge = true AND sq.is_completed = false in_progress
FROM sq
    
ORDER BY 
    sq.user_id,
    sq.course_id