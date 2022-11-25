WITH
flat_cte AS 
(
	SELECT
		ase.user_id,
		ev.id exam_version_id,
		ase.id answer_session_id,
		qv.id question_version_id,
        qd.module_id question_module_id,
		ga.score,
        qd.max_score question_max_score,
		ed.title
	FROM public.exam_version ev
	
	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id 

	INNER JOIN public.answer_session ase
	ON ase.exam_version_id = ev.id
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id
	
	LEFT JOIN public.question_data qd
	ON qd.id = qv.question_data_id

	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	AND ga.answer_session_id = ase.id
	
	ORDER BY
		ase.user_id,
		ev.id,
		ase.id,
		qv.id
),
grouped_cte AS 
(
	SELECT
		flat.user_id,
		flat.exam_version_id,
		flat.answer_session_id,
        flat.question_module_id,
		COUNT(*)::int question_count,
		COALESCE(SUM(flat.score), 0)::int exam_score,
		COALESCE(SUM(flat.question_max_score), 0)::int exam_max_score,
		COALESCE(SUM(CASE WHEN flat.score IS NOT NULL THEN 1 ELSE 0 END), 0)::int answered_question_count
	FROM flat_cte flat

	GROUP BY 
		flat.exam_version_id,
		flat.answer_session_id,
        flat.question_module_id,
		flat.user_id
	
	ORDER BY
		flat.user_id,
		flat.exam_version_id,
		flat.answer_session_id,
        question_module_id
),
exam_module_scores AS
(
    SELECT 
        grouped.*,
        ROUND(grouped.exam_score::numeric / grouped.exam_max_score::numeric * 100, 1)::int score_percentage
    FROM grouped_cte grouped
),
pretest_module_avgs AS
(
    SELECT
        esv.user_id,
        esv.exam_version_id,
        esv.question_module_id,
        esv.score_percentage
    FROM exam_module_scores esv

    LEFT JOIN public.exam_version ev
    ON ev.id = esv.exam_version_id

   INNER JOIN public.exam ex
    ON ex.id = ev.exam_id
    AND ex.is_pretest IS TRUE
),
final_exam_module_avgs AS
(
    SELECT
        esv.user_id,
        esv.exam_version_id,
        esv.question_module_id,
        esv.score_percentage score_percentage
    FROM exam_module_scores esv

    LEFT JOIN public.exam_version ev
    ON ev.id = esv.exam_version_id

    INNER JOIN public.exam_data ed
    ON ed.id = ev.exam_data_id
    AND ed.is_final IS TRUE
),
latest_modules AS
(

    SELECT 
        mv.module_id,
        MAX(mv.id) module_version_id
    FROM public.module_version mv

    GROUP BY mv.module_id
)

SELECT
    pma.user_id,
    mv.id module_version_id,
    cv.course_id,
    md.name module_name,
    pma.exam_version_id pretest_exam_version_id,
    pma.score_percentage pretest_exam_score_percentage,
    fema.exam_version_id final_exam_version_id,
    fema.score_percentage final_exam_score_percentage
    
FROM pretest_module_avgs pma

INNER JOIN final_exam_module_avgs fema
ON fema.user_id = pma.user_id
AND fema.question_module_id = pma.question_module_id

LEFT JOIN latest_modules lm
ON lm.module_id = pma.question_module_id

LEFT JOIN public.module_version mv
ON mv.id = lm.module_version_id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id