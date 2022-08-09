SELECT 
	sq.*,
	COALESCE(sq.total_exam_session_elapsed_time, 0)
		+ COALESCE(sq.total_video_watch_elapsed_time, 0)
		+ COALESCE(sq.total_video_question_elapsed_time, 0)
		+ COALESCE(sq.total_practise_question_elapsed_time, 0) total_spent_seconds
FROM 
(
	SELECT 
		u.id AS user_id,
		co.id AS course_id,
		(
			SELECT 
				EXTRACT(EPOCH FROM SUM(sq.elapsed))
			FROM (
				SELECT 
					cicv.completion_date - start_date AS elapsed
				FROM public.exam_version ev
				
				LEFT JOIN public.module_version mv
				ON mv.id = ev.module_version_id
				
				LEFT JOIN public.course_version cv
				ON cv.id = mv.course_version_id

				LEFT JOIN public.answer_session_view asev
				ON asev.exam_version_id = ev.id 
					AND asev.user_id = u.id
					AND asev.start_date IS NOT NULL

				INNER JOIN public.course_item_completion_view cicv
				ON cicv.answer_session_id = asev.answer_session_id

				WHERE asev.answer_session_type = 'exam'
				AND cv.course_id = co.id
				AND asev.user_id = u.id
			) sq
		) total_exam_session_elapsed_time,
		(
			SELECT 
				SUM(vps.to_seconds - vps.from_seconds)
			FROM public.video_playback_sample vps

			LEFT JOIN public.video_version vv
			ON vv.id = vps.video_version_id 
				AND vps.user_id = u.id
			
			LEFT JOIN public.module_version mv
			ON mv.id = vv.module_version_id

			LEFT JOIN public.course_version cv
			ON cv.id = mv.course_version_id

			WHERE cv.course_id = co.id
			AND vps.user_id = u.id
			
		) total_video_watch_elapsed_time,
		(
			SELECT 
				SUM(ga.elapsed_seconds)
			FROM public.video_version vv

			LEFT JOIN public.answer_session_view asev
			ON asev.video_version_id = vv.id 
				AND asev.user_id = u.id
				AND asev.answer_session_type = 'normal'

			LEFT JOIN public.given_answer ga
			ON ga.answer_session_id = asev.answer_session_id
			
			LEFT JOIN public.module_version mv
			ON mv.id = vv.module_version_id

			LEFT JOIN public.course_version cv
			ON cv.id = mv.course_version_id

			WHERE asev.user_id = u.id
			AND cv.course_id = co.id
		) total_video_question_elapsed_time,
		(
			SELECT 
				(COUNT(ga.id) * 15)::integer
			FROM public.video_version vv

			LEFT JOIN public.answer_session_view asev
			ON asev.video_version_id = vv.id 
				AND asev.user_id = u.id
				AND asev.answer_session_type = 'practise'

			LEFT JOIN public.given_answer ga
			ON ga.answer_session_id = asev.answer_session_id

			LEFT JOIN public.module_version mv
			ON mv.id = vv.module_version_id

			LEFT JOIN public.course_version cv
			ON cv.id = mv.course_version_id

			WHERE asev.user_id = u.id
			AND cv.course_id = u.id
		) total_practise_question_elapsed_time
	FROM public.course co

	CROSS JOIN public.user u

	ORDER BY u.id, co.id
) sq