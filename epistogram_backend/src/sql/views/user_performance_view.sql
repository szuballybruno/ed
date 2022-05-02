WITH
user_answers AS 
(
	SELECT 
		ga.id given_answer_id,
		ga.is_correct given_answer_is_correct,
		ga.elapsed_seconds,
		ase.user_id user_id,
		CASE
			WHEN (is_practise_answer IS true) THEN 'practise'
			WHEN (ase.video_id IS NOT NULL AND ase.exam_id IS NULL) THEN 'video'
			WHEN (
				ase.exam_id IS NOT NULL 
				AND ase.video_id IS NULL 
				AND ase.type = 'exam'
			) THEN 'exam'
			ELSE NULL
		END AS given_answer_type
		

	FROM public.given_answer ga

	LEFT JOIN public.answer_session AS ase
	ON ase.id = answer_session_id
),
user_answer_groups AS 
(
	SELECT
		ua.user_id user_id,
		COUNT(1) total_answer_count,
		SUM(ua.elapsed_seconds) / COUNT(1) average_reaction_time,
		SUM((ua.given_answer_type = 'video')::int) video_answer_count,
		SUM((ua.given_answer_type = 'practise')::int) practise_answer_count,
		SUM((ua.given_answer_type = 'exam')::int) exam_answer_count,
		SUM((ua.given_answer_type = 'video' AND ua.given_answer_is_correct)::int) correct_video_answer_count,
		SUM((ua.given_answer_type = 'practise' AND ua.given_answer_is_correct)::int) correct_practise_answer_count,
		SUM((ua.given_answer_type = 'exam' AND ua.given_answer_is_correct)::int) correct_exam_answer_count
	FROM user_answers ua
	WHERE ua.given_answer_type IS NOT NULL
	GROUP BY ua.user_id
)

SELECT
	u.id user_id,
	COALESCE(
		(
			uag.correct_exam_answer_count::double precision / NULLIF(uag.exam_answer_count, 0) * 100 * 2.5 +
			uag.correct_video_answer_count::double precision / NULLIF(uag.video_answer_count, 0) * 100 * 1.5 +
			uag.correct_practise_answer_count::double precision / NULLIF(uag.practise_answer_count, 0) * 100
		) / 5, 
		0
	) performance_percentage,
	(
		SELECT
			AVG(uagg.average_reaction_time)
		FROM user_answer_groups uagg
	) total_average_reaction_time,
	uag.average_reaction_time
FROM public.user u

LEFT JOIN user_answer_groups uag
ON uag.user_id = u.id

/*GROUP BY 
	u.id
	uag.correct_exam_answer_count, 
	uag.exam_answer_count, 
	uag.correct_video_answer_count,
	uag.video_answer_count,
	uag.correct_practise_answer_count,
	uag.practise_answer_count,
	*/
