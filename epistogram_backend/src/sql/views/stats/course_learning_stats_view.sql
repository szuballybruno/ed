SELECT 
	acv.*,
	cstv.total_spent_seconds,
	(
		SELECT 
			cicv.item_count
		FROM public.course_item_count_view cicv
		WHERE cicv.course_id = acv.course_id 
	) total_course_item_count,
	(
		SELECT COUNT(course_id)::integer
		FROM public.course_item_playlist_view cipv
		WHERE cipv.course_id = acv.course_id  
			AND cipv.user_id = acv.user_id
			AND cipv.item_state = 'completed' 
	) completed_course_item_count,
	(
		SELECT 
			COUNT(v.id)::int
		FROM public.video v
		
		LEFT JOIN public.video_version vv
		ON vv.video_id = v.id
	
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course co
		ON co.id = cv.course_id
		
		WHERE co.id = acv.course_id
	) total_video_count,
	(
		SELECT COUNT(course_id)::integer
		FROM public.course_item_playlist_view cisv
		WHERE cisv.course_id = acv.course_id 
			AND cisv.user_id = acv.user_id
			AND cisv.item_state = 'completed' 
			AND cisv.video_id IS NOT NULL
	) completed_video_count,
	(
		SELECT 
			COUNT(qv.id)::int
		FROM public.video v
		
		LEFT JOIN public.video_version vv
		ON vv.video_id = v.id
		
		LEFT JOIN public.question_version qv
		ON qv.video_version_id = vv.id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course co
		ON co.id = acv.course_id

		GROUP BY co.id
	) total_video_question_count,
	(
		SELECT 
			COALESCE(SUM ((sq.times_answered > 0)::int)::int, 0)
		FROM
		(
			SELECT 
				COUNT(ga.id) times_answered
			FROM public.given_answer ga
			
			LEFT JOIN public.answer_session_view asv
			ON asv.answer_session_id = ga.answer_session_id
			AND asv.user_id = acv.user_id
			
			LEFT JOIN public.video_version vv
			ON vv.id = asv.answer_session_id
			
			LEFT JOIN public.module_version mv
			ON mv.id = vv.module_version_id
			
			LEFT JOIN public.course_version cv
			ON cv.id = mv.course_version_id
			
			LEFT JOIN public.course co
			ON co.id = cv.course_id
		) sq
	) answered_video_question_count,
	(
		SELECT 
			COALESCE(AVG(elsrv.success_rate), 0)::int
		FROM public.exam_latest_success_rate_view elsrv
		WHERE elsrv.user_id = acv.user_id 
		AND elsrv.course_id = acv.course_id 
	) exam_success_rate_average,
	(
		SELECT CASE 
			WHEN cqsv.total_answer_count > 0
				THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
				ELSE 0
			END
		FROM public.course_questions_success_view cqsv
		WHERE cqsv.course_id = acv.course_id  
		AND cqsv.user_id = acv.user_id 
	) question_success_rate,
	(
		SELECT 
			elsv.success_rate::int
		FROM public.exam ex
		
		LEFT JOIN public.exam_version ev
		ON ev.exam_id = ex.id
		
		LEFT JOIN public.exam_data ed
		ON ed.id = ev.exam_data_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = ev.module_version_id

		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id

		LEFT JOIN public.course co
		ON co.id = cv.course_id
		
		LEFT JOIN 
			public.exam_latest_success_rate_view elsv
		ON elsv.user_id = acv.user_id AND elsv.exam_id = ex.id
		
		WHERE ed.is_final IS TRUE
		AND co.id = acv.course_id
	) final_exam_success_rate
FROM public.available_course_view acv

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = acv.user_id AND cstv.course_id = acv.course_id

-- WHERE acv.is_started = true OR acv.is_completed = true