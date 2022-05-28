SELECT ga.id given_answer_id,
       ga.is_correct given_answer_is_correct,
       ga.elapsed_seconds,
       ga.answer_session_id,
       ase.user_id,
       v.id video_id,
       e.id exam_id,
       c.id course_id,
       CASE
           WHEN (is_practise_answer IS TRUE) THEN 'practise'
           WHEN (ase.video_id IS NOT NULL
                 AND ase.exam_id IS NULL) THEN 'video'
           WHEN (ase.exam_id IS NOT NULL
                 AND ase.video_id IS NULL
                 AND ase.type = 'exam') THEN 'exam'
           ELSE NULL
       END given_answer_type
FROM public.given_answer ga
LEFT JOIN public.answer_session AS ase ON ase.id = ga.answer_session_id
LEFT JOIN public.exam e ON e.id = ase.exam_id
LEFT JOIN public.video v ON v.id = ase.video_id
LEFT JOIN public.course c ON c.id = v.course_id
OR c.id = e.course_id