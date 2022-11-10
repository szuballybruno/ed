/* WITH
pretest_module_avgs AS
(
    SELECT
        esv.user_id,
        qd.module_id,
        AVG(esv.score_percentage) score_percentage
    FROM public.exam_score_view esv

    LEFT JOIN public.exam_version ev
    ON ev.id = esv.exam_version_id

    INNER JOIN public.exam ex
    ON ex.id = ev.exam_id
    AND ex.is_pretest IS TRUE
    
    LEFT JOIN public.question_version qv
    ON qv.exam_version_id = ev.id

    LEFT JOIN public.question_data qd
    ON qd.id = qv.question_data_id

    GROUP BY esv.user_id, qd.module_id

    ORDER BY esv.user_id, qd.module_id
),
final_exam_module_avgs AS
(
    SELECT
        esv.user_id,
        qd.module_id,
        AVG(esv.score_percentage) score_percentage
    FROM public.exam_score_view esv

    LEFT JOIN public.exam_version ev
    ON ev.id = esv.exam_version_id

    INNER JOIN public.exam_data ed
    ON ed.id = ev.exam_data_id
    AND ed.is_final IS TRUE
    
    LEFT JOIN public.question_version qv
    ON qv.exam_version_id = ev.id

    LEFT JOIN public.question_data qd
    ON qd.id = qv.question_data_id

    GROUP BY esv.user_id, qd.module_id

    ORDER BY esv.user_id, qd.module_id
)

SELECT
*
FROM pretest_module_avgs pma

FULL JOIN final_exam_module_avgs fema
ON fema.user_id = pma.user_id
AND fema.module_id = pma.module_id

 */
/* SELECT
    *
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.exam_version ev
ON ev.module_version_id = mv.id

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.latest */

SELECT * FROM public.exam_version ev

INNER JOIN public.exam_data ed
ON ed.id = ev.exam_data_id
AND ed.is_final IS TRUE

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

WHERE ev.id = 161