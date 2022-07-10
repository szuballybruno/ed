-- user exams with correct answer rate and completion length seconds
WITH user_exam AS (
    SELECT
        u.id user_id,
        ev.exam_id,
        asv.answer_session_id answer_session_id,
        EXTRACT(SECONDS FROM asv.end_date - asv.start_date) exam_length_seconds,
            COALESCE(erv.correct_given_answer_count::double precision, 0) /
            COALESCE(erv.question_count, 0) exam_correct_answer_rate
    FROM public.user u
    
    LEFT JOIN public.answer_session_view asv
    ON asv.user_id = u.id
	
	LEFT JOIN public.exam_version ev
	ON ev.id = asv.exam_version_id
    
    LEFT JOIN public.exam_result_view erv
    ON erv.answer_session_id = asv.answer_session_id
    
    WHERE
        asv.answer_session_type = 'exam'
        AND end_date IS NOT NULL
),

-- single and all users exam completion length averages
user_exam_averages AS (
    SELECT
        sq.user_id,
        100.0 * (sq.average_exam_length_seconds - sq.total_average_exam_length_seconds) /
        sq.total_average_exam_length_seconds exam_length_percent_diff
    FROM (
        SELECT
            u.id user_id,
            (
                SELECT AVG(ue.exam_length_seconds)
                FROM user_exam ue
            ) total_average_exam_length_seconds,
            (
                SELECT
                    AVG(ue.exam_length_seconds) average_exam_length_seconds
                FROM user_exam ue
                WHERE ue.user_id = u.id
                AND ue.exam_correct_answer_rate > 0.70 -- exam correct answer rate should be larger than 70%
            ) average_exam_length_seconds
        FROM public.user u
        GROUP BY
            u.id
    ) sq
),

-- single user exam completion points from comparing to all users average
user_exam_points AS (
    SELECT
        uea.*,
        CASE
            WHEN (uea.exam_length_percent_diff > 65)
                THEN 0
            WHEN (uea.exam_length_percent_diff > 55)
                THEN 10
            WHEN (uea.exam_length_percent_diff > 45)
                THEN 20
            WHEN (uea.exam_length_percent_diff > 30)
                THEN 25
            WHEN (uea.exam_length_percent_diff > 15)
                THEN 30
            WHEN (uea.exam_length_percent_diff > -15)
                THEN 50
            WHEN (uea.exam_length_percent_diff > -25)
                THEN 65
            WHEN (uea.exam_length_percent_diff > -35)
                THEN 80
            WHEN (uea.exam_length_percent_diff > -50)
                THEN 90
            WHEN (uea.exam_length_percent_diff < -50)
                THEN 100
            ELSE NULL
        END user_exam_length_points
    
    FROM user_exam_averages uea
),


user_answers AS (
    SELECT
        ga.id given_answer_id,
        ga.is_correct given_answer_is_correct,
        ga.elapsed_seconds,
        ga.answer_session_id,
        asv.user_id,
        asv.start_date,
        asv.end_date,
        asv.answer_session_type
    FROM public.given_answer ga
    
    LEFT JOIN public.answer_session_view AS asv
    ON asv.answer_session_id = ga.answer_session_id
),


-- single and all users reaction time averages from video quiz questions
user_reaction_averages AS (
    SELECT
        sq.*,
        100.0 * (sq.average_reaction_time - sq.total_average_reaction_time) / sq.total_average_reaction_time reaction_time_percent_diff
    FROM (
        SELECT
            u.id user_id,
            (
                SELECT AVG(ua.elapsed_seconds)
                FROM user_answers ua
                WHERE ua.elapsed_seconds IS NOT NULL
                AND ua.user_id = u.id
            ) average_reaction_time,
            (
                SELECT AVG(ua.elapsed_seconds)
                FROM user_answers ua
                WHERE ua.elapsed_seconds IS NOT NULL
            ) total_average_reaction_time
        FROM public.user u
    ) sq
),

-- single user reaction time points from comparing to all users average
user_reaction_points AS (
    SELECT
        ura.user_id,
        ura.reaction_time_percent_diff,
        CASE
            WHEN (ura.reaction_time_percent_diff > 65)
                THEN 0
            WHEN (ura.reaction_time_percent_diff > 55)
                THEN 10
            WHEN (ura.reaction_time_percent_diff > 45)
                THEN 20
            WHEN (ura.reaction_time_percent_diff > 30)
                THEN 25
            WHEN (ura.reaction_time_percent_diff > 15)
                THEN 30
            WHEN (ura.reaction_time_percent_diff > -15)
                THEN 50
            WHEN (ura.reaction_time_percent_diff > -25)
                THEN 65
            WHEN (ura.reaction_time_percent_diff > -35)
                THEN 80
            WHEN (ura.reaction_time_percent_diff > -50)
                THEN 90
            WHEN (ura.reaction_time_percent_diff < -50)
                THEN 100
            ELSE NULL
        END user_reaction_time_points
    
    FROM user_reaction_averages ura
)

SELECT
    u.id user_id,
    COALESCE(uep.user_exam_length_points, 0) user_exam_length_points,
    COALESCE(urp.user_reaction_time_points, 0) user_reaction_time_points,
    (COALESCE(urp.user_reaction_time_points::double precision, 0) * 3 + COALESCE(uep.user_exam_length_points::double precision, 0)) / 4 total_user_reaction_time_points,
    urp.reaction_time_percent_diff
FROM public.user u

LEFT JOIN user_performance_answer_group_view upagv
ON upagv.user_id = u.id

LEFT JOIN user_exam_points uep
ON uep.user_id = u.id

LEFT JOIN user_reaction_points urp
ON urp.user_id = u.id

GROUP BY
    u.id,
    uep.user_exam_length_points,
    urp.user_reaction_time_points,
    urp.reaction_time_percent_diff