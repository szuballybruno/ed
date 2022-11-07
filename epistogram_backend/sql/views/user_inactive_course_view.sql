/*
* Gets every course that is:
* - Started in the last 30 days AND
* - Inactive for the last 14 days AND
* - The progress is less than 50%
*/
WITH 
latest_user_sessions AS
(
	SELECT
		usv.user_id,
		cv.course_id,
		MAX(usa.creation_date) latest_course_activity
	FROM user_session_activity AS usa
	
	LEFT JOIN public.user_session_view usv
    ON usv.id = usa.activity_session_id

    LEFT JOIN public.video_version vv
    ON vv.id = usa.video_version_id

    LEFT JOIN public.exam_version ev
    ON ev.id = usa.exam_version_id

    LEFT JOIN public.module_version mv
    ON mv.id = vv.module_version_id
    OR mv.id = ev.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE cv.course_id IS NOT NULL
	AND usa.creation_date > CURRENT_DATE - 30 -- sessions only from the last 30 days
    AND usv.length_seconds != 0 -- no empty sessions
    AND usv.is_finalized = true -- no not finalized sessions
	
	GROUP BY usv.user_id, cv.course_id
)

SELECT 
	lus.user_id,
	COUNT(lus.course_id) inactive_course_count
FROM latest_user_sessions lus

INNER JOIN public.course_progress_view AS cpv
ON cpv.user_id = lus.user_id
AND cpv.course_id = lus.course_id
AND cpv.progress_percentage < 50

INNER JOIN public.user_course_bridge AS ucb 
ON ucb.user_id = lus.user_id
AND ucb.course_id = lus.course_id
AND ucb.creation_date > CURRENT_DATE - 30

WHERE lus.latest_course_activity < CURRENT_DATE - 14 -- no session since 14 days

GROUP BY lus.user_id

