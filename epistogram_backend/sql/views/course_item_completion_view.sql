
-- This view returns only the unique course item completions.
-- Video completions are unique, exam completions made unique
-- by selecting the latests.

WITH 
-- Returns the latest exam completion, with the largest
-- answer_session_id which is also the latest
latest_exam_completion_cte AS
(
	SELECT
		ase.user_id,
		ase.exam_version_id,
		MAX(ec.completion_date) completion_date,
		MAX(ase.id) answer_session_id
	FROM public.exam_completion ec

	LEFT JOIN public.answer_session ase
	ON ase.id = ec.answer_session_id

	GROUP BY ase.user_id, ase.exam_version_id
),
course_item_completion_cte AS 
(
    SELECT DISTINCT
		lecc.exam_version_id,
		null::int video_version_id,
		lecc.user_id,
		lecc.answer_session_id,
		lecc.completion_date
	FROM latest_exam_completion_cte lecc
    UNION ALL
    SELECT 
		null::int exam_version_id,
		vc.video_version_id,
		vc.user_id,
		null::int answer_session_id,
		vc.completion_date
	FROM public.video_completion vc
)
SELECT
    cice.user_id,
    cice.video_version_id,
    vv.video_id,
    cice.exam_version_id,
    ev.exam_id,
    cice.answer_session_id,
    cice.completion_date,
    cv.id course_version_id,
    cv.course_id,
	mv.module_id,
    ex.is_pretest
FROM course_item_completion_cte cice

LEFT JOIN public.video_version vv
ON vv.id = cice.video_version_id

LEFT JOIN public.exam_version ev
ON ev.id = cice.exam_version_id

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
OR mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id
