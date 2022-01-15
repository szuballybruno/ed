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
		SELECT COUNT(v.id)::int
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
		SELECT COALESCE(SUM ((sq.times_answered > 0)::int)::int, 0)
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
	) answered_video_question_count,
	(
		SELECT COALESCE(AVG(elsrv.success_rate), 0)::int
		FROM public.exam_latest_success_rate_view elsrv
		WHERE elsrv.user_id = cv.user_id AND elsrv.course_id = cv.id 
	) exam_success_rate_average,
	(
		SELECT CASE WHEN cqsv.total_answer_count > 0
			THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
			ELSE 0
		END
		FROM public.course_questions_success_view cqsv
		WHERE cqsv.course_id = cv.id AND cqsv.user_id = cv.user_id 
	) question_success_rate,
	(
		SELECT elsv.success_rate::int
		FROM public.exam ex
		
		LEFT JOIN public.exam_latest_success_rate_view elsv
		ON elsv.user_id = cv.user_id AND elsv.exam_id = ex.id
		
		WHERE ex.course_id = cv.id AND ex.is_final_exam = true
	) final_exam_success_rate
FROM public.course_view cv

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = cv.user_id AND cstv.course_id = cv.id

-- WHERE cv.is_started = true OR cv.is_completed = true