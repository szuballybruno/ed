SELECT 
	sq.*,
	
	CASE WHEN sq.total_given_answer_count = 0
		THEN 0
		ELSE  sq.total_correct_given_answer_count::double precision / sq.total_given_answer_count * 100 
	END total_correct_answer_rate,
	
	CASE WHEN sq.completed_exam_count = 0
		THEN 0
		ELSE sq.successful_exam_count::double precision / sq.completed_exam_count * 100 
	END total_successful_exam_rate
FROM 
(
	SELECT 
		u.id user_id,
		u.email user_email,

		-- completed video count 
		(
			SELECT COUNT(uvpb.completion_date)::int
			FROM public.user_video_progress_bridge uvpb
			WHERE uvpb.user_id = u.id
		) completed_video_count,

		-- completed_exam_count
		(
			SELECT SUM (ecv.has_completed_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) completed_exam_count,

		-- completed_exam_count
		(
			SELECT SUM (ecv.has_successful_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) successful_exam_count,

		-- total watch time
		(
			SELECT SUM (vpsv.total_playback_duration)::double precision
			FROM public.video_playback_sample_view vpsv
			WHERE vpsv.user_id = u.id 
		) total_video_playback_seconds,

		-- total given answer count
		(
			SELECT COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session ase
			ON ase.id = ga.answer_session_id

			LEFT JOIN public.question q
			ON q.id = ga.question_id

			WHERE ase.user_id = u.id AND q.video_id IS NOT NULL
		) total_given_answer_count,

		-- total correct given answer count
		(
			SELECT COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session ase
			ON ase.id = ga.answer_session_id

			LEFT JOIN public.question q
			ON q.id = ga.question_id

			WHERE ase.user_id = u.id 
				AND q.video_id IS NOT NULL
				AND ga.is_correct = true 
		) total_correct_given_answer_count,
	
		-- total session length 
		(
			SELECT SUM(usav.length_seconds)::int
			FROM public.user_session_view usav
			
			WHERE usav.user_id = u.id
		) total_session_length_seconds,
	
		-- avg session length
		(
			SELECT AVG(usav.length_seconds)::int
			FROM public.user_session_view usav
			
			WHERE usav.user_id = u.id
		) average_session_length_seconds,
	
		-- avg session success rate
		(
			SELECT AVG(asv.correct_answer_rate)::int
			FROM public.answer_session_view asv
			
			WHERE asv.user_id = u.id 
				AND asv.answer_session_id IS NOT NULL
				AND asv.exam_id IS DISTINCT FROM 1
		) total_answer_session_success_rate
	FROM public.user u

	WHERE u.deletion_date IS NULL -- AND u.is_invitation_accepted = true

	ORDER BY u.id
) sq