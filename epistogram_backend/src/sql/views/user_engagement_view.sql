WITH
sessions AS
(
	SELECT
		usv.user_id user_id,
		EXTRACT(WEEK FROM start_date) week_num,
		usv.length_seconds > 60 * 15 is_longer_than_fifteen_minutes,
		usv.length_seconds < 60 * 5 AND usv.length_seconds != 0 is_shorter_than_five_minutes
	FROM public.user_session_view usv
	WHERE usv.is_finalized = true
),
session_groups AS
(
	SELECT
		s.user_id user_id,
		s.week_num week_num,
		COUNT(1) total_session_count,
		SUM(s.is_longer_than_fifteen_minutes::int) is_longer_than_fifteen_minutes_count,
		SUM(s.is_shorter_than_five_minutes::int) is_shorter_than_five_minutes_count
	FROM sessions s
	GROUP BY
		s.week_num,
		s.user_id
),
session_points AS
(
	SELECT
		sg.user_id user_id,
		SUM(LEAST (sg.total_session_count * 1, 10)) session_count_points,
		SUM(LEAST (sg.is_longer_than_fifteen_minutes_count * 5, 40)) is_longer_than_fifteen_minutes_points,
		SUM(GREATEST (sg.is_shorter_than_five_minutes_count * -3, -15)) is_shorter_than_five_minutes_points
	FROM session_groups sg
	GROUP BY
		sg.user_id
),
total_session_length_points AS
(
	SELECT
		-- gets points for total session length
		sq.user_id user_id,
        CASE
            -- if total length of sessions longer than 360 minutes then 50 points
			WHEN sq.length_minutes > 360
                THEN 50
            -- if total length of sessions longer than 240 minutes then 45 points
			WHEN sq.length_minutes > 240
                THEN 45
            -- if total length of sessions longer than 180 minutes then 40 points
			WHEN sq.length_minutes > 180
                THEN 40
            -- if total length of sessions longer than 120 minutes then 30 points
			WHEN sq.length_minutes > 120
                THEN 30
            -- if total length of sessions longer than 60 minutes then 15 points
            WHEN sq.length_minutes > 60
                THEN 15
            -- if total length of sessions longer than 0 minutes then 10 points
            WHEN sq.length_minutes > 0
                THEN 10
            ELSE 0
        END total_session_length_points
	FROM
	(
		SELECT
			usv.user_id,
			SUM(usv.length_seconds) / 60 length_minutes
		FROM user_session_view usv
		WHERE usv.start_date > CURRENT_DATE - 30
		GROUP BY usv.user_id
	) sq
),

/*
* Gets every course that is:
* - Started in the last 30 days AND
* - Inactive for the last 14 days AND
* - The progress is less than 50%
*/
user_inactive_courses AS
(
    SELECT
        user_course_sessions.user_id user_id,
        COUNT(course_id)
    FROM (
        SELECT DISTINCT ON (course_id)
            usv.user_id user_id,
            usv.end_date session_end_date,
            ucb.id course_id,
            EXTRACT(WEEK FROM usv.start_date) AS week,
            COUNT(c.id * -10) points
        FROM public.user_session_view usv

        LEFT JOIN public.user_session_activity AS usa
        ON usa.activity_session_id = usv.id

        LEFT JOIN public.video AS v
        ON v.id = usa.video_id

        LEFT JOIN public.exam AS e
        ON e.id = usa.exam_id

        LEFT JOIN public.course AS c
        ON c.id = v.course_id
        OR c.id = e.course_id

        LEFT JOIN public.course_progress_view AS cpv
        ON cpv.user_id = usv.user_id
        AND cpv.course_id = c.id

        LEFT JOIN public.user_course_bridge AS ucb
        ON ucb.user_id = usv.user_id
        AND ucb.course_id = c.id

        WHERE usv.start_date > CURRENT_DATE - 30 -- sessions only from the last 30 days
        AND usv.end_date < CURRENT_DATE - 14 -- no session since 14 days
        AND ucb.creation_date > CURRENT_DATE - 30 -- courses started in the last 30 days
        AND cpv.progress_percentage < 50 -- courses with less than 50 percent progress
        AND usv.length_seconds != 0 -- no empty sessions
        AND usv.is_finalized = true -- no not finalized sessions

        GROUP BY usv.user_id, usv.start_date, usv.end_date, ucb.id

        ORDER BY course_id, usv.end_date desc -- important for distinct on so it can get the latest session for course
    ) user_course_sessions

    GROUP BY user_course_sessions.user_id
)

SELECT
	u.id user_id,
	(tslp.total_session_length_points
	+ sp.session_count_points
	+ sp.is_longer_than_fifteen_minutes_points
	+ sp.is_shorter_than_five_minutes_points
	+ COALESCE(uic.count, 0) * -10::int)::int engagement_points
FROM public.user u

LEFT JOIN session_points sp
ON sp.user_id = u.id

LEFT JOIN total_session_length_points tslp
ON tslp.user_id = u.id

LEFT JOIN user_inactive_courses uic
ON uic.user_id = u.id