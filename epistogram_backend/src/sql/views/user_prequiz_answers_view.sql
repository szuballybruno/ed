WITH 
prequiz_question_answers AS
(
	SELECT 
		pua.user_id,
		pua.question_id,
		pua.course_id,
		pua.value raw_value,
		pa.value answer_value,
		pa.id answer_id
	FROM public.prequiz_user_answer pua

	LEFT JOIN public.prequiz_answer pa
	ON pa.id = pua.answer_id
)

SELECT 
	ucb.user_id,
	ucb.course_id,
	ROUND((pqa_per_week.answer_value * 60 * 60) / 7) estimated_seconds_per_day,
	(
		SELECT pqa.raw_value
		FROM prequiz_question_answers pqa
		WHERE pqa.user_id = ucb.user_id 
			AND pqa.course_id = ucb.course_id
			AND pqa.question_id = 1
	) experience,
	(
		SELECT pqa.answer_id
		FROM prequiz_question_answers pqa
		WHERE pqa.user_id = ucb.user_id 
			AND pqa.course_id = ucb.course_id
			AND pqa.question_id = 2
	) planned_usage_answer_id
FROM public.user_course_bridge ucb

LEFT JOIN prequiz_question_answers pqa_per_week
	ON pqa_per_week.user_id = ucb.user_id 
		AND pqa_per_week.question_id = 4 
		AND pqa_per_week.course_id = ucb.course_id 

ORDER BY
	ucb.user_id,
	ucb.course_id