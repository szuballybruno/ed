-- [ADMIN / USER LIST] this view is used to query the data 
-- that will be displayed on the admin / main user list.

WITH 
module_last_exam_averages AS
(
    SELECT 
        mlesv.user_id,
        mlesv.course_id,
        AVG(mlesv.exam_score) avg_module_last_exam_score
    FROM public.module_last_exam_score_view mlesv

	WHERE mlesv.exam_score IS NOT NULL

    GROUP BY mlesv.user_id, mlesv.course_id
),
total_user_sessions AS
(	
	SELECT 
		usav.user_id,
		SUM(usav.length_seconds)::int total_session_length_seconds
	FROM public.user_session_view usav

	GROUP BY usav.user_id
),
completed_video_count_cte AS
(
	SELECT
		ccvcv.user_id,
		SUM(ccvcv.completed_video_count)::int completed_video_count
	FROM public.completed_course_video_count_view ccvcv

	GROUP BY ccvcv.user_id
),
avg_user_performance_cte AS
(
	SELECT
		upv.user_id,
		AVG(upv.performance_percentage)::int average_performance_percentage
	FROM public.user_performance_view upv
	
	GROUP BY 
		upv.user_id
)
SELECT 
	u.id user_id,
	u.first_name,
	u.last_name,
	u.company_id,
	u.email user_email,
	u.creation_date signup_date,
	u.username,
	sf.file_path avatar_file_path,
	COALESCE(aupc.average_performance_percentage, 0) average_performance_percentage,
	COALESCE(tus.total_session_length_seconds, 0) total_session_length_seconds,
	COALESCE(cvcc.completed_video_count, 0) completed_video_count
FROM public.user u

LEFT JOIN public.storage_file sf
ON sf.id = u.avatar_file_id

LEFT JOIN total_user_sessions tus
ON tus.user_id = u.id

LEFT JOIN avg_user_performance_cte aupc
ON aupc.user_id = u.id

LEFT JOIN completed_video_count_cte cvcc
ON cvcc.user_id = u.id

WHERE u.deletion_date IS NULL
