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
company_exam_success_rate AS
(
	SELECT
		co.id company_id,
		ex.id exam_id,
		AVG(asv.answer_session_success_rate)::int exam_success_rate_by_company
	FROM public.company co
	
	LEFT JOIN public.user u
	ON u.company_id = co.id

	CROSS JOIN public.exam ex

	LEFT JOIN public.exam_version ev
	ON ev.exam_id = ex.id

	LEFT JOIN public.answer_session_view asv
	ON asv.exam_version_id = ev.id
	AND asv.user_id = u.id

	GROUP BY co.id, ex.id
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
	asv.answer_session_success_rate correct_answer_rate,
	cesr.exam_success_rate_by_company
FROM public.exam_version ev

LEFT JOIN public.exam e
ON e.id = ev.exam_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

CROSS JOIN public.user u
	
LEFT JOIN latest_answer_session las
ON las.exam_version_id = ev.id
AND las.user_id = u.id

LEFT JOIN public.answer_session_view asv
ON asv.answer_session_id = las.answer_session_id

LEFT JOIN answer_session_lengths asl
ON asl.answer_session_id = asv.answer_session_id

LEFT JOIN company_exam_success_rate cesr
ON cesr.company_id = u.company_id
AND cesr.exam_id = e.id

LEFT JOIN fully_correctly_answered_questions fcaq
ON fcaq.answer_session_id = asv.answer_session_id

LEFT JOIN question_count qc
ON qc.exam_version_id = ev.id

WHERE e.id != 1

ORDER BY 
	u.id,
	e.id,
	asv.answer_session_id