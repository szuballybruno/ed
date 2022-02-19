SELECT 
	sq.*,
	COALESCE(sq.total_exam_session_elapsed_time, 0)
		+ COALESCE(sq.total_video_watch_elapsed_time, 0)
		+ COALESCE(sq.total_video_question_elapsed_time, 0)
		+ COALESCE(sq.total_practise_question_elapsed_time, 0) AS total_spent_time
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
					ase.end_date - start_date AS elapsed
				FROM public.exam e

				LEFT JOIN public.answer_session ase
				ON ase.exam_id = e.id 
					AND ase.user_id = u.id
					AND ase.start_date IS NOT NULL
					AND ase.end_date IS NOT NULL 

				WHERE e.id <> 1 AND e.course_id = co.id
			) sq
		) total_exam_session_elapsed_time,
		(
			SELECT 
				SUM(vps.to_seconds - vps.from_seconds)
			FROM public.video_playback_sample vps

			LEFT JOIN public.video v
			ON v.id = vps.video_id 
				AND vps.user_id = u.id

			WHERE v.course_id = co.id
		) total_video_watch_elapsed_time,
		(
			SELECT 
				SUM(ga.elapsed_seconds)
			FROM public.video v

			LEFT JOIN public.answer_session ase
			ON ase.video_id = v.id 
				AND ase.user_id = u.id
				AND ase.type = 'normal'

			LEFT JOIN public.given_answer ga
			ON ga.answer_session_id = ase.id

			WHERE v.course_id = co.id
		) total_video_question_elapsed_time,
		(
			SELECT 
				(COUNT(ga.id) * 15)::integer
			FROM public.video v

			LEFT JOIN public.answer_session ase
			ON ase.video_id = v.id 
				AND ase.user_id = u.id
				AND ase.type = 'practise'

			LEFT JOIN public.given_answer ga
			ON ga.answer_session_id = ase.id

			WHERE v.course_id = co.id
		) total_practise_question_elapsed_time
	FROM public.course co

	LEFT JOIN public.user u
	ON 1 = 1

	ORDER BY u.id, co.id
) sq