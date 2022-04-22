SELECT 
    ucb.course_id,
    ucb.creation_date course_creation_date,
    usa.type activity_type,
    usa.video_id activity_video_id,
    usa.exam_id activity_exam_id,
    usa.creation_date activity_creation_date,
    usv.user_id,
    usv.id session_id,
    usv.start_date start_date,
    usv.end_date end_date,
    usv.length_seconds length_seconds,
    cpv.progress_percentage completed_percentage
FROM public.user_session_view usv

LEFT JOIN public.user_session_activity AS usa
ON usa.activity_session_id = usv.id

LEFT JOIN public.video AS v
ON v.id = usa.video_id

LEFT JOIN public.exam AS e
ON e.id = usa.exam_id

LEFT JOIN public.course AS c
ON c.id = v.course_id
OR c.id = e.course_id

LEFT JOIN public.course_progress_view AS cpv
ON cpv.user_id = usv.user_id
AND cpv.course_id = c.id

LEFT JOIN public.user_course_bridge AS ucb
ON ucb.user_id = usv.user_id
AND ucb.course_id = c.id

WHERE start_date > CURRENT_DATE - 30
AND ucb.creation_date > CURRENT_DATE - 30