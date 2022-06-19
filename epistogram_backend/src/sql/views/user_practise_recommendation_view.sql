WITH 

-- get the latest given answer id per question_version 
latest_given_answer_ids AS 
(
	SELECT 
		MAX(ga.id) given_answer_id, 
		ga.question_version_id,
		ase.user_id
	FROM given_answer ga
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY 
		ga.question_version_id,
		ase.user_id
),

-- get the total, and correct given 
-- answer counts from all given answers 
-- even from the practise section on home screen 
answer_counts AS
(
	SELECT 
		vv.id video_version_id,
		COUNT(ga.id) total_given_answer_count,
		SUM(ga.is_correct::int) total_correct_answer_count
	FROM public.video_version vv
	
	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	
	GROUP BY 
		vv.id,
		ga.question_version_id
),

-- calculate if video is recommended for 
-- practise by checking if all question - answers are correct
-- even if they're answered in the practise dialog on home page
video_is_recommended AS
(
	SELECT 
		vv.id video_version_id,
		ase.user_id,
		SUM(ga.is_correct::int) != COUNT(ga.id) is_recommended
	FROM public.video_version vv
	
	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	LEFT JOIN latest_given_answer_ids lgai
	ON lgai.question_version_id = qv.id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = lgai.given_answer_id
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY
		vv.id,
		ase.user_id
)
SELECT 
    vv.id video_version_id,
    vir.user_id,
	cv.id course_version_id,
    ac.total_given_answer_count::int,
    ac.total_correct_answer_count::int,
    vir.is_recommended is_recommended_for_practise
FROM public.video_version vv

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id
	
LEFT JOIN video_is_recommended vir
ON vir.video_version_id = vv.id

LEFT JOIN answer_counts ac
ON ac.video_version_id = vv.id