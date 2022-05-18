WITH user_answers AS (
    SELECT
        ga.question_id,
        ga.creation_date,
        ga.is_correct,
        ase.user_id,
        v.id video_id,
        CASE
            WHEN (is_practise_answer IS TRUE)
                THEN 'practise'
            WHEN (ase.video_id IS NOT NULL AND ase.exam_id IS NULL)
                THEN 'video'
            WHEN (ase.exam_id IS NOT NULL AND ase.video_id IS NULL AND ase.type = 'exam')
                THEN 'exam'
        END given_answer_type,
        ROW_NUMBER() OVER(PARTITION BY ga.question_id ORDER BY ga.creation_date DESC) AS order_in_group
    FROM public.given_answer ga
    
    LEFT JOIN public.answer_session AS ase
    ON ase.id = ga.answer_session_id

    LEFT JOIN public.question AS q
    ON q.id = ga.question_id
    
    LEFT JOIN public.video AS v
    ON v.id = q.video_id
 
    ORDER BY ga.question_id, ga.creation_date, ase.video_id

)

SELECT
    question_id,
    user_id,
    video_id,
    sq.given_answer_type,
    SUM(given_answer_count) total_given_answer_count,
    SUM(is_correct::int) total_correct_answer_count,
    COALESCE(SUM(NULLIF(is_correct::int, 0)) / SUM(NULLIF(given_answer_count, 0)) , 0) last_three_answer_average
FROM (
    SELECT
        *,
        COUNT(DISTINCT ua.question_id) as given_answer_count
    FROM user_answers ua
    
    WHERE ua.order_in_group <= 3
    
    GROUP BY
        ua.question_id,
        ua.creation_date,
        ua.is_correct,
        ua.order_in_group,
        ua.user_id,
        ua.given_answer_type,
        ua.video_id
) sq

GROUP BY sq.question_id, sq.user_id, sq.video_id, sq.given_answer_type