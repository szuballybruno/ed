/*
* Gets every course that is:
* - Started in the last 30 days AND
* - Inactive for the last 14 days AND
* - The progress is less than 50%
*/
SELECT
    user_course_sessions.user_id user_id,
    COUNT(course_id) inactive_course_count
FROM (
    SELECT DISTINCT ON (course_id)
        usv.user_id user_id,
        usv.end_date session_end_date,
        cv.course_id course_id,
        EXTRACT(WEEK FROM usv.start_date) AS week,
        COUNT(cv.course_id * -10) points
    FROM public.user_session_view usv

    LEFT JOIN public.user_session_activity AS usa
    ON usa.activity_session_id = usv.id

    LEFT JOIN public.video_version vv
    ON vv.id = usa.video_version_id

    LEFT JOIN public.exam_version ev
    ON ev.id = usa.exam_version_id

    LEFT JOIN public.module_version mv
    ON mv.id = vv.module_version_id
    OR mv.id = ev.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

    LEFT JOIN public.course_progress_view AS cpv
    ON cpv.user_id = usv.user_id
    AND cpv.course_id = cv.course_id

    LEFT JOIN public.user_course_bridge AS ucb
    ON ucb.user_id = usv.user_id
    AND ucb.course_id = cv.course_id

    WHERE usv.start_date > CURRENT_DATE - 30 -- sessions only from the last 30 days
    AND usv.end_date < CURRENT_DATE - 14 -- no session since 14 days
    AND ucb.creation_date > CURRENT_DATE - 30 -- courses started in the last 30 days
    AND cpv.progress_percentage < 50 -- courses with less than 50 percent progress
    AND usv.length_seconds != 0 -- no empty sessions
    AND usv.is_finalized = true -- no not finalized sessions

    GROUP BY usv.user_id, usv.start_date, usv.end_date, cv.course_id

    ORDER BY course_id, usv.end_date desc -- important for distinct on so it can get the latest session for course
) user_course_sessions

GROUP BY user_course_sessions.user_id

