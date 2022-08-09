WITH 
sq AS 
(
    SELECT 
       u.id user_id,
       qv.question_id,
       SUM(CASE WHEN ga.is_practise_answer THEN 1 ELSE 0 END)::int practise_answer_count,
       COUNT(*)::int answer_count,
       MAX(ga.id) last_given_answer_id
    FROM public.user u

    INNER JOIN public.answer_session ase
    ON ase.user_id = u.id 
    AND ase.is_practise = false

    INNER JOIN public.exam_version ev
    ON ev.id = ase.exam_version_id

    INNER JOIN public.exam e
    ON e.id = ev.exam_id 
    AND e.is_pretest = false 
    AND e.is_signup = false

    INNER JOIN public.given_answer ga
    ON ga.answer_session_id = ase.id

    LEFT JOIN public.question_version qv
    ON qv.id = ga.question_version_id 

    GROUP BY
       u.id,
       qv.question_id
)
SELECT 
    sq.*,
    ga.is_correct last_answer_is_correct,
    ga.creation_date last_answer_date,
    ga.is_practise_answer last_answer_is_practise
FROM sq

LEFT JOIN public.given_answer ga
ON ga.id = sq.last_given_answer_id
    
