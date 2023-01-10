WITH stats AS 
(
	SELECT 
		u.id user_id,
		u.email user_email,

		(
			SELECT
				AVG(upv.performance_percentage)
			FROM public.user_performance_view upv
			WHERE upv.user_id = u.id
			AND upv.performance_percentage != 0
			AND upv.performance_percentage IS NOT NULL
		) performance_percentage,

		-- most frequent time range
		usbv.average_session_block most_frequent_time_range,

		-- engagement points D
		(
			SELECT 
				engagement_points
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
			SELECT COUNT(*)::int
			FROM public.course_item_completion_view cicv
			WHERE cicv.user_id = u.id
			AND cicv.video_version_id IS NOT NULL
		) watched_videos,

		-- completed_exam_count
		(
			SELECT SUM (ecv.has_completed_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) completed_exam_count,

		-- total given correct answer count on video and practise questions D
		(
			SELECT 
				COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session_view asv
			ON asv.answer_session_id = ga.answer_session_id
			AND (asv.answer_session_type = 'video' 
				 OR asv.answer_session_type = 'practise')

			WHERE asv.user_id = u.id 
		) answered_video_and_practise_quiz_questions,

		-- total given answer count on video and practise questions D
		(
			SELECT 
				COUNT (ga.id)::int 
			FROM public.given_answer ga

			LEFT JOIN public.answer_session_view asv
			ON asv.answer_session_id = ga.answer_session_id
			AND (asv.answer_session_type = 'video' 
				 OR asv.answer_session_type = 'practise')

			WHERE asv.user_id = u.id 
			AND ga.state = 'CORRECT'
		) correct_answered_video_and_practise_quiz_questions,

		-- average watched videos per day
		(
			SELECT COUNT(*)::double precision / 30
			FROM public.course_item_completion_view cicv
			WHERE cicv.user_id = u.id
			AND cicv.completion_date > CURRENT_DATE - 30
		) average_watched_videos_per_day,

		-- avg session length
		(
			SELECT AVG(usav.length_seconds)::int
			FROM public.user_session_view usav

			WHERE usav.user_id = u.id
		) average_session_length_seconds,

		-- completed_exam_count
		(
			SELECT 
				COUNT(ecv.has_successful_session::int)::int
			FROM public.exam_completed_view ecv
			WHERE ecv.user_id = u.id
		) total_done_exams,

		-- videos to be repeated count

		(
			SELECT 
				COUNT(uprv.total_given_answer_count)::int
			FROM public.user_practise_recommendation_view uprv
			WHERE uprv.is_recommended_for_practise IS TRUE
		) videos_to_be_repeated_count

	FROM public.user u

	LEFT JOIN public.user_performance_view upv
	ON upv.user_id = u.id

	LEFT JOIN public.user_session_block_view usbv
	ON usbv.user_id = u.id

	WHERE u.deletion_date IS NULL

	GROUP BY 
		u.id, 
		u.email,
		usbv.average_session_block

	ORDER BY u.id
)

SELECT 
	st.*,

	-- correct answer rate
	CASE WHEN st.answered_video_and_practise_quiz_questions = 0
		THEN 0
		ELSE st.correct_answered_video_and_practise_quiz_questions:: double precision / st.answered_video_and_practise_quiz_questions * 100
	END correct_answer_rate_percentage,

	(st.engagement_points * 3 + st.performance_percentage * 3 + 100 * 0.5) / 6.5 overall_performance_percentage
FROM stats st
