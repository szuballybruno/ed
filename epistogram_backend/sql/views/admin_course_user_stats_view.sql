-- Haladás
-- Teljesítmény
-- Megtekintett videók (x/y)
-- Elvégzett vizsgák (x/y)
-- Eltöltött idő
-- Kurzuszáró eredménye
-- Határidő
--/ Várható befejezés vagy 'elvégezve'
--/ Lemaradás - itt % helyett lehet érdemes lenne minden ilyen lemaradást napban megadni, mert úgy lesz értelmezhető a HR számára, 30% lehet 10 nap meg 2 is
--/ Bővebben - itt azt a modalt hozza fel, mint mikor egyenként nézzük a haladást a usereknél az adott kurzusnál
--+Összesített eredmény 
--    Összes NMI kérdésre adott válasza az adott tanfolyamban a kurzuszáró vizsgáig % x1
--    Összes modulzáró vizsgája % x 2
--    Kurzuszáró vizsga %  x3
-- Majd ezt leosztjuk 6-al
--+Kurzus összegző report

WITH 
module_last_exam_averages AS
(
    SELECT 
        mlesv.user_id,
        mlesv.course_id,
        AVG(mlesv.exam_score) avg_module_last_exam_score
    FROM public.module_last_exam_score_view mlesv

    GROUP BY mlesv.user_id, mlesv.course_id
),
summerized_answer_result AS
(
    SELECT
        mlea.user_id,
        mlea.course_id,
        (
            (COALESCE(upagv.practise_correct_answer_rate, 0)) + 
            (COALESCE(mlea.avg_module_last_exam_score, 0) * 2) +
            (COALESCE(fesv.final_exam_score_percentage, 0) * 3)
        ) / 6 summerized_score
    FROM module_last_exam_averages mlea

    LEFT JOIN public.final_exam_score_view fesv
    ON fesv.user_id = mlea.user_id
	AND fesv.course_id = mlea.course_id

    LEFT JOIN public.user_performance_answer_group_view upagv
    ON upagv.user_id = mlea.user_id
    AND upagv.course_id = mlea.course_id
) 

SELECT 
    comp.id company_id,
    u.id user_id,
    co.id course_id,
    u.first_name,
    u.last_name,
    sf.file_path avatar_url,
    ucpav.completed_percentage,
    upv.performance_percentage,
    ccvcv.completed_video_count,
    ccecv.completed_exam_count,
    cvcv.video_count,
    cecv.exam_count,
    cstv.total_spent_seconds,
    fesv.final_exam_score_percentage,
    tcdv.required_completion_date,
    sar.summerized_score,

    -- tempomat
    tcdv.start_date,
    tcdv.tempomat_adjustment_value,
    tcdv.tempomat_mode,
    tcdv.original_previsioned_completion_date,
    tcdv.total_item_count,
    tcdv.total_completed_item_count
FROM public.course_access_bridge cab

LEFT JOIN public.company comp
ON comp.id = cab.company_id

LEFT JOIN public.user u
ON u.id = cab.user_id
OR u.company_id = cab.company_id

LEFT JOIN public.course co
ON co.id = cab.course_id

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.user_id = u.id
AND ucpav.course_id = co.id

LEFT JOIN public.user_performance_view upv
ON upv.user_id = u.id
AND upv.course_id = co.id 

LEFT JOIN public.completed_course_video_count_view ccvcv
ON ccvcv.user_id = u.id
AND ccvcv.course_id = co.id

LEFT JOIN public.completed_course_exam_count_view ccecv
ON ccecv.user_id = u.id
AND ccecv.course_id = co.id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_id = co.id

LEFT JOIN public.course_exam_count_view cecv
ON cecv.course_id = co.id

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = u.id
AND cstv.course_id = co.id

LEFT JOIN public.final_exam_score_view fesv
ON fesv.user_id = u.id
AND fesv.course_id = co.id

LEFT JOIN summerized_answer_result sar
ON sar.user_id = u.id
AND sar.course_id = co.id

LEFT JOIN public.tempomat_calculation_data_view tcdv
ON tcdv.user_id = u.id
AND tcdv.course_id = co.id

LEFT JOIN public.storage_file sf
ON sf.id = u.avatar_file_id

ORDER BY comp.id, u.id, co.id