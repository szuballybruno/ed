WITH
assigned_courses AS
(
	SELECT
		u.id user_id,
		co.id course_id
	FROM public.user u

	INNER JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id
	AND upv.permission_code = 'WATCH_COURSE'

	INNER JOIN public.course co
	ON co.id = upv.context_course_id
),
completed_videos AS
(
	SELECT
		cicv.user_id,
		cicv.course_version_id,
		COUNT(*) completed_video_count
	FROM public.course_item_completion_view cicv
	
	WHERE cicv.video_version_id IS NOT NULL
	
	GROUP BY cicv.course_version_id, cicv.user_id
),
final_exam_score_percentage AS
(
	SELECT 
		lasv.user_id,
		lev.course_id,
		MAX(esv.exam_score) final_exam_score_percentage
	FROM public.latest_answer_session_view lasv
	
	INNER JOIN public.latest_exam_view lev
	ON lev.exam_version_id = lasv.exam_version_id
	
	INNER JOIN public.exam_version ev
	ON ev.id = lev.exam_version_id 
	
	INNER JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
	AND ed.is_final = true
	
	LEFT JOIN public.exam_score_view esv
	ON esv.exam_version_id = ev.id
	
	GROUP BY lasv.user_id, lev.course_id
)
SELECT
	u.id user_id,
	co.id course_id,
	cd.title,
	true can_view,
	sf.file_path file_path,
	cosv.is_completed is_completed,
	cosv.in_progress is_started,
	csc.id sub_category_id,
	cd.is_featured,
	false is_recommended,
	cc.id category_id,
	cc.name category_name,
	csc.name sub_category_name,
	ucb.current_item_code,
	ucb.stage_name stage_name,
	ucb.required_completion_date,
	cov.completed_video_count,
	fesp.final_exam_score_percentage,
	teacher.id teacher_id,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,
	cvlv.sum_length_seconds total_video_sum_length_seconds,
	cvcv.video_count total_video_count,
	cd.difficulty,
	cd.benchmark
FROM assigned_courses ac

LEFT JOIN public.course co
ON co.id = ac.course_id

LEFT JOIN public.latest_course_version_view lcv
ON lcv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user u
ON u.id = ac.user_id

LEFT JOIN public.course_video_length_view cvlv
ON cvlv.course_version_id = cv.id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_version_id = cv.id

LEFT JOIN public.course_state_view cosv
ON cosv.course_id = co.id
AND cosv.user_id = u.id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.course_category csc
ON csc.id = cd.sub_category_id

LEFT JOIN public.user teacher
ON teacher.id = cd.teacher_id

LEFT JOIN completed_videos cov
ON cov.user_id = u.id
AND cov.course_version_id = cv.id

LEFT JOIN final_exam_score_percentage fesp
ON fesp.user_id = u.id
AND fesp.course_id = co.id

WHERE co.deletion_date IS NULL

ORDER BY
	u.id,
	co.id



