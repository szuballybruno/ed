SELECT 
	sq.*,
	
	/* CASE WHEN sq.completed_exam_count = 0
		THEN 0
		ELSE sq.successful_exam_count::double precision / sq.completed_exam_count * 100 
	END total_successful_exam_rate, */

	-- correct answer rate
	CASE WHEN sq.answered_video_and_practise_quiz_questions = 0
		THEN 0
		ELSE sq.correct_answered_video_and_practise_quiz_questions:: double precision / sq.answered_video_and_practise_quiz_questions * 100
	END correct_answer_rate_percentage,

	(sq.engagement_points * 3 + sq.performance_percentage * 3 + 100 * 0.5) / 6.5 overall_performance_percentage
FROM 
(
	SELECT 
		u.id user_id,
		u.email user_email,

		upv.performance_percentage performance_percentage,
		upv.reaction_time_percent_diff user_reaction_time_difference_percentage,
		upv.user_reaction_time_points,
		upv.user_exam_length_points,

		-- most frequent time range
		usbv.average_session_block most_frequent_time_range,

		0 videos_to_be_repeated_count,

		-- engagement points D
		(
			SELECT engagement_points
			FROM public.user_engagement_view uev
			WHERE uev.user_id = u.id
		) engagement_points,

		-- total session length D
		(
			SELECT SUM(usav.length_seconds)::int
			FROM public.user_session_view usav
			
			WHERE usav.user_id = u.id
		) total_time_active_on_platform_seconds,

		-- completed video count D
		(
			SELECT COUNT(uvpb.completion_date)::int
			FROM public.user_video_progress_bridge uvpb
			WHERE uvpb.user_id = u.id
		) watched_videos,
		
		-- completed_exam_count
		(
			SELECT SUM (ecv.has_completed_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) completed_exam_count,

		-- total given correct answer count on video and practise questions D
		(
			SELECT COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session ase
			ON ase.id = ga.answer_session_id

			LEFT JOIN public.question q
			ON q.id = ga.question_id

			WHERE ase.user_id = u.id 
			AND q.video_id IS NOT NULL
			AND ase.video_id IS NOT NULL
			OR ga.is_practise_answer IS true
		) answered_video_and_practise_quiz_questions,

		-- total given answer count on video and practise questions D
		(
			SELECT COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session ase
			ON ase.id = ga.answer_session_id

			LEFT JOIN public.question q
			ON q.id = ga.question_id

			WHERE ase.user_id = u.id 
			AND q.video_id IS NOT NULL
			AND ga.is_correct IS true
			AND ase.video_id IS NOT NULL
			OR ga.is_practise_answer IS true
		) correct_answered_video_and_practise_quiz_questions,

		-- average watched videos per day
		(
			SELECT COUNT(uvpb.completion_date)::double precision / 30
			FROM public.user_video_progress_bridge uvpb
			WHERE uvpb.user_id = u.id
			AND uvpb.completion_date > CURRENT_DATE - 30
		) average_watched_videos_per_day,

		-- avg session length
		(
			SELECT AVG(usav.length_seconds)::int
			FROM public.user_session_view usav
			
			WHERE usav.user_id = u.id
		) average_session_length_seconds,

		-- completed_exam_count
		(
			SELECT SUM (ecv.has_successful_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) total_done_exams

		-- videos to be repeated count

	FROM public.user u

	LEFT JOIN public.user_performance_view upv
	ON upv.user_id = u.id

	LEFT JOIN public.user_session_block_view usbv
	ON usbv.user_id = u.id

	WHERE u.deletion_date IS NULL -- AND u.is_invitation_accepted = true

	ORDER BY u.id
) sq