SELECT 
	cv.*,
	cstv.total_spent_time,
	(
		SELECT COUNT(course_id)::integer
		FROM public.course_item_view cisv
		WHERE cisv.course_id = cv.id 
	) total_course_item_count,
	(
		SELECT COUNT(course_id)::integer
		FROM public.course_item_state_view cisv
		WHERE cisv.course_id = cv.id 
			AND cisv.user_id = cv.user_id
			AND cisv.state = 'completed' 
	) completed_course_item_count,
	(
		SELECT COUNT(v.id)
		FROM public.video v
		WHERE v.course_id = cv.id
	) total_video_count,
	(
		SELECT COUNT(course_id)::integer
		FROM public.course_item_state_view cisv
		WHERE cisv.course_id = cv.id 
			AND cisv.user_id = cv.user_id
			AND cisv.state = 'completed' 
			AND cisv.video_id IS NOT NULL
	) completed_video_count,
	(
		SELECT COUNT(q.id)::int
		FROM public.video v
		
		LEFT JOIN public.question q
		ON q.video_id = v.id
		
		WHERE v.course_id = cv.id
	) total_video_question_count,
	(
		SELECT 
			SUM ((sq.times_answered > 0)::int)::int
		FROM
		(
			SELECT COUNT(ga.id) times_answered
			FROM public.video v

			LEFT JOIN public.question q
			ON q.video_id = v.id

			LEFT JOIN public.answer_session ase
			ON ase.video_id = v.id
				AND ase.user_id = cv.user_id

			LEFT JOIN public.given_answer ga
			ON ga.question_id = q.id  
				AND ga.answer_session_id = ase.id

			WHERE v.course_id = cv.id

			GROUP BY q.id
		) sq
	) answered_video_question_count
FROM public.course_view cv

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = cv.user_id AND cstv.course_id = cv.id

WHERE cv.is_started = true OR cv.is_completed = true