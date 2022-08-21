WITH 
question_correct_answer_rates AS
(
	SELECT 
		ase.id answer_session_id,
		ase.user_id,
		qv.id question_version_id,
		AVG(ga.is_correct::int)::int * 100 correct_answer_rate
	FROM public.given_answer ga
	
	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY ase.id, ase.user_id, qv.id
), 
fully_correctly_answered_questions AS
(
    SELECT
        qcar.answer_session_id,
        COUNT(qcar.correct_answer_rate = 100 OR NULL)::int fully_correctly_answered_questions_count
    FROM question_correct_answer_rates qcar

    GROUP BY qcar.answer_session_id
),
answer_session_lengths AS
(
	SELECT
		asv.answer_session_id,
		asv.start_date,
		asv.end_date,
		EXTRACT(EPOCH FROM (asv.end_date::time - asv.start_date::time))::double precision AS length_seconds 
	FROM public.answer_session_view asv

	WHERE asv.start_date IS NOT NULL
	AND asv.end_date IS NOT NULL
),
avg_exam_score_per_company_cte AS
(
	SELECT
		u.company_id,
		ev.exam_id,
		AVG(esv.score_percentage)::int avg_score_percentage
	FROM public.exam_score_view esv
	
	LEFT JOIN public.exam_version ev
	ON ev.id = esv.exam_version_id
	
	LEFT JOIN public.answer_session ase
	ON ase.id = esv.answer_session_id
	
	LEFT JOIN public.user u
	ON u.id = ase.user_id
	
	GROUP BY
		u.company_id,
		ev.exam_id
),
latest_answer_session AS
(
	SELECT
		u.id user_id,
		ev.id exam_version_id,
		MAX(asv.answer_session_id)::int answer_session_id
	FROM public.user u
	
	CROSS JOIN public.exam_version ev
	
	LEFT JOIN public.answer_session_view asv
	ON asv.user_id = u.id
	AND asv.exam_version_id = ev.id

	WHERE asv.is_completed = true

	GROUP BY u.id, ev.id
),
question_count AS
(
	SELECT
		ev.id exam_version_id,
		COUNT(qv.id)::int question_count
	FROM public.exam_version ev
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id
	
	GROUP BY  ev.id
)

SELECT 
	u.id user_id,
	ev.id exam_version_id,
	asv.answer_session_id answer_session_id,
	fcaq.fully_correctly_answered_questions_count,
    qc.question_count question_count,
	asl.length_seconds::int exam_length_seconds,
	esv.score_percentage,
	esv.exam_score,
	esv.exam_max_score,
	asv.answered_question_count,
	aespcc.avg_score_percentage,
	esv.score_percentage - aespcc.avg_score_percentage score_percentage_diff_from_avg
FROM latest_answer_session las 

LEFT JOIN public.exam_version ev
ON ev.id = las.exam_version_id

LEFT JOIN public.exam e
ON e.id = ev.exam_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.user u
ON u.id = las.user_id

LEFT JOIN public.answer_session_view asv
ON asv.answer_session_id = las.answer_session_id

LEFT JOIN answer_session_lengths asl
ON asl.answer_session_id = asv.answer_session_id

LEFT JOIN avg_exam_score_per_company_cte aespcc
ON aespcc.company_id = u.company_id
AND aespcc.exam_id = e.id

LEFT JOIN fully_correctly_answered_questions fcaq
ON fcaq.answer_session_id = asv.answer_session_id

LEFT JOIN question_count qc
ON qc.exam_version_id = ev.id

LEFT JOIN public.exam_score_view esv
ON esv.answer_session_id = las.answer_session_id

-- filter signup exam
WHERE e.id != 1

ORDER BY 
	u.id,
	e.id,
	asv.answer_session_id