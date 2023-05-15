WITH highest_exam_score AS 
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
				ev.exam_id,
				ev.id
			ORDER BY 
				esv.exam_score DESC
		) = 1 is_highest_score
	FROM public.exam_score_view esv

	INNER JOIN public.latest_exam_view lev
	ON lev.exam_version_id = esv.exam_version_id
	
	LEFT JOIN public.exam_version ev
	ON ev.id = lev.exam_version_id
)

SELECT 
    hes.user_id,
    hes.exam_id,
    hes.exam_version_id,
    hes.answer_session_id,
    hes.exam_score,
    hes.is_highest_score
FROM highest_exam_score hes

WHERE hes.is_highest_score