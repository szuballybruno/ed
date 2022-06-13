WITH
latest_ids AS
(
    SELECT qv.question_id, MAX(id) version_id
    LEFT JOIN public.question_version qv
    GROUP BY qv.question_id
)
SELECT
    latest_ids.question_id,
    qv.id version_id,
    qd.id data_id,
    qd.*
FROM latest_ids

LEFT JOIN public.question_version qv
ON qv.id = latest_ids.version_id 

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id