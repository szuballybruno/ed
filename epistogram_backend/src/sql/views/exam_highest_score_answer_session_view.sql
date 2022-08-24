SELECT 
    rns.user_id,
    rns.exam_id,
    rns.exam_version_id,
    rns.answer_session_id,
    rns.exam_score,
    rns.is_highest_score
FROM 
(
    SELECT
        esv.user_id,
        ev.exam_id,
        ev.id exam_version_id,
        esv.answer_session_id,
        esv.exam_score,
        ROW_NUMBER() OVER (
            PARTITION BY 
                esv.user_id,
                ev.exam_id 
            ORDER BY 
                esv.exam_score DESC
        ) = 1 is_highest_score
    FROM public.exam_score_view esv

    LEFT JOIN public.exam_version ev
    ON ev.id = esv.exam_version_id 
) rns 

WHERE rns.is_highest_score