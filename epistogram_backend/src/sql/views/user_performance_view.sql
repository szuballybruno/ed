WITH user_answers AS (
    SELECT
        ga.id given_answer_id,
        ga.is_correct given_answer_is_correct,
        ga.elapsed_seconds,
        ga.answer_session_id,
        ase.user_id,
        ase.start_date,
        ase.end_date,
        CASE
            WHEN (is_practise_answer IS TRUE)
                THEN 'practise'
            WHEN (ase.video_id IS NOT NULL AND ase.exam_id IS NULL)
                THEN 'video'
            WHEN (ase.exam_id IS NOT NULL AND ase.video_id IS NULL AND ase.type = 'exam')
                THEN 'exam'
            ELSE NULL
        END given_answer_type
    FROM public.given_answer ga
    
    LEFT JOIN public.answer_session AS ase
    ON ase.id = ga.answer_session_id
),
    
    -- different answer groups and average reaction time for single user
    user_answer_groups AS (
        SELECT
            ua.user_id user_id,
            COUNT(1) total_answer_count,
            AVG(ua.elapsed_seconds) average_reaction_time,
            SUM((ua.given_answer_type = 'video')::int) video_answer_count,
            SUM((ua.given_answer_type = 'practise')::int) practise_answer_count,
            SUM((ua.given_answer_type = 'exam')::int) exam_answer_count,
            SUM((ua.given_answer_type = 'video' AND ua.given_answer_is_correct)::int) correct_video_answer_count,
            SUM((ua.given_answer_type = 'practise' AND ua.given_answer_is_correct)::int) correct_practise_answer_count,
            SUM((ua.given_answer_type = 'exam' AND ua.given_answer_is_correct)::int) correct_exam_answer_count
        FROM user_answers ua
        WHERE
            ua.given_answer_type IS NOT NULL
        GROUP BY
            ua.user_id
    ),
    
    -- user exams with correct answer rate and completion length seconds
    user_exam AS (
        SELECT
            u.id user_id,
            ase.exam_id,
            ase.id answer_session_id,
            EXTRACT(SECONDS FROM ase.end_date - ase.start_date) exam_length_seconds,
                COALESCE(erv.correct_given_answer_count::double precision, 0) /
                COALESCE(erv.question_count, 0) exam_correct_answer_rate
        FROM public.user u
        
        LEFT JOIN public.answer_session ase
        ON ase.user_id = u.id
        
        LEFT JOIN public.exam_result_view erv
        ON erv.answer_session_id = ase.id
        
        WHERE
            ase.type = 'exam'
            AND end_date IS NOT NULL
        
        GROUP BY
            u.id,
            ase.id,
            erv.question_count,
            erv.correct_given_answer_count
    ),
    
    -- single and all users exam completion length averages
    user_exam_averages AS (
        SELECT
            sq.*,
                    100.0 * (sq.average_exam_length_seconds - sq.total_average_exam_length_seconds) /
                    sq.total_average_exam_length_seconds exam_length_percent_diff
        FROM (
            SELECT
                ue.user_id,
                (
                    SELECT AVG(ue.exam_length_seconds)
                    FROM user_exam ue
                ) total_average_exam_length_seconds,
                AVG(ue.exam_length_seconds) average_exam_length_seconds
            FROM user_exam ue
            WHERE
                exam_correct_answer_rate > 0.70 -- exam correct answer rate should be larger than 70%
            GROUP BY
                ue.user_id
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
                ELSE 100
            END user_exam_length_points
        
        FROM user_exam_averages uea
    ),
    
    -- single and all users reaction time averages from video quiz questions
    user_reaction_averages AS (
        SELECT
            sq.*,
            100.0 * (sq.average_reaction_time - sq.total_average_reaction_time) / sq.total_average_reaction_time reaction_time_percent_diff
        FROM (
            SELECT
                uag.user_id user_id,
                (
                    SELECT AVG(uag.average_reaction_time)
                    FROM user_answer_groups uag
                ) total_average_reaction_time,
                uag.average_reaction_time
            FROM user_answer_groups uag
        ) sq
    ),

    -- single user reaction time points from comparing to all users average
    user_reaction_points AS (
        SELECT
            ura.*,
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
                ELSE 100
            END user_reaction_time_points
        
        FROM user_reaction_averages ura
    )

SELECT
    u.id user_id,
    COALESCE((uag.correct_exam_answer_count::double precision / NULLIF(uag.exam_answer_count, 0) * 100 * 2.5 +
              uag.correct_video_answer_count::double precision / NULLIF(uag.video_answer_count, 0) * 100 * 1.5 +
              uag.correct_practise_answer_count::double precision / NULLIF(uag.practise_answer_count, 0) * 100) / 5,
             0) performance_percentage,
    COALESCE(uep.user_exam_length_points, 0) user_exam_length_points,
    COALESCE(urp.user_reaction_time_points, 0) user_reaction_time_points,
    urp.reaction_time_percent_diff
FROM public.user u

LEFT JOIN user_answer_groups uag
ON uag.user_id = u.id

LEFT JOIN user_exam_points uep
ON uep.user_id = u.id

LEFT JOIN user_reaction_points urp
ON urp.user_id = u.id