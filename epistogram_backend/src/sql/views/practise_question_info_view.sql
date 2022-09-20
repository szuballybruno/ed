WITH
latest_given_answer_cte AS
(
    SELECT
        asv.user_id,
        ga.question_version_id,
        asv.answer_session_type,
        MAX(ga.id) latest_id,
        COUNT(*)::int answer_count,
        SUM(CASE WHEN ga.is_practise_answer THEN 1 ELSE 0 END)::int practise_answer_count
    FROM given_answer ga

    LEFT JOIN public.answer_session_view asv
    ON asv.answer_session_id = ga.answer_session_id

    GROUP BY
        ga.question_version_id,
        asv.answer_session_type,
        asv.user_id

    ORDER BY
        asv.user_id
)
SELECT
    lgac.user_id,
    qv.question_id,
    lgac.question_version_id,
    lgac.answer_count,
    lgac.practise_answer_count,
    latest_ga.creation_date given_answer_date,
    latest_ga.id given_answer_id,
    latest_ga.is_correct is_correct,
    ase.is_practise is_practise
FROM latest_given_answer_cte lgac

LEFT JOIN public.given_answer latest_ga
ON latest_ga.id = lgac.latest_id

LEFT JOIN public.answer_session ase
ON ase.id = latest_ga.answer_session_id

INNER JOIN public.question_version qv
ON qv.id = latest_ga.question_version_id

WHERE lgac.answer_session_type = 'video'


