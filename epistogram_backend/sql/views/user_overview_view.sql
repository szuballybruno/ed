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
summerized_answer_result AS (
    SELECT
        mlea.user_id,
        mlea.course_id,
        CASE
			WHEN fesv.final_exam_score_percentage IS NULL
			THEN (
				(
					(COALESCE(upagv.practise_correct_answer_rate, 0)) + 
					(COALESCE(mlea.avg_module_last_exam_score, 0) * 2)
				) / 3
			)
			WHEN fesv.final_exam_score_percentage > 0
			THEN (
				(
					(COALESCE(upagv.practise_correct_answer_rate, 0)) + 
					(COALESCE(mlea.avg_module_last_exam_score, 0) * 2) +
					(COALESCE(fesv.final_exam_score_percentage, 0) * 3)
				) / 6 
			)
		END summerized_score
    FROM module_last_exam_averages mlea

    LEFT JOIN public.final_exam_score_view fesv
    ON fesv.user_id = mlea.user_id
	AND fesv.course_id = mlea.course_id

    LEFT JOIN public.user_performance_answer_group_view upagv
    ON upagv.user_id = mlea.user_id
    AND upagv.course_id = mlea.course_id
),
summerized_answer_result_avg AS
(
	SELECT
		sar.user_id,
		AVG(sar.summerized_score) summerized_score_avg
	FROM summerized_answer_result sar

	GROUP BY sar.user_id
),
total_user_sessions AS
(	
	SELECT 
		usav.user_id,
		SUM(usav.length_seconds)::int total_session_length_seconds
	FROM public.user_session_view usav

	GROUP BY usav.user_id
),
completed_video_count_avg AS
(
	SELECT
		ccvcv.user_id,
		SUM(ccvcv.completed_video_count)::int completed_video_count
	FROM public.completed_course_video_count_view ccvcv

	GROUP BY ccvcv.user_id
),
user_performance_averages AS
(
	SELECT
		upv.user_id,
		AVG(upv.performance_percentage::int)::int average_performance_percentage
	FROM public.user_performance_view upv

	WHERE upv.performance_percentage IS NOT NULL
	AND upv.performance_percentage != 0
	
	GROUP BY upv.user_id

)

SELECT 
	u.id user_id,
	u.first_name,
	u.last_name,
	u.company_id,
	u.email user_email,
	u.creation_date signup_date,
	sf.file_path avatar_file_path,
    sara.summerized_score_avg,
	upa.average_performance_percentage,
	tus.total_session_length_seconds,
	cvca.completed_video_count,
	uev.engagement_points,
	urtv.total_user_reaction_time_points reaction_time
FROM public.user u

LEFT JOIN public.storage_file sf
ON sf.id = u.avatar_file_id

LEFT JOIN total_user_sessions tus
ON tus.user_id = u.id

LEFT JOIN summerized_answer_result_avg sara
ON sara.user_id = u.id

LEFT JOIN user_performance_averages upa
ON upa.user_id = u.id

LEFT JOIN completed_video_count_avg cvca
ON cvca.user_id = u.id

LEFT JOIN public.user_engagement_view uev
ON uev.user_id = u.id

LEFT JOIN public.user_reaction_time_view urtv
ON urtv.user_id = u.id

WHERE u.deletion_date IS NULL
