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
user_session_lengths AS
(
	SELECT
		usv.user_id,
		SUM(usv.length_seconds) / 60 length_minutes
	FROM public.user_session_view usv
	WHERE usv.start_date > CURRENT_DATE - 30
	GROUP BY usv.user_id
),
total_session_length_points AS
(
	SELECT
		-- gets points for total session length
		usl.user_id user_id,
        CASE
            -- if total length of sessions longer than 360 minutes then 50 points
			WHEN usl.length_minutes > 360
                THEN 50
            -- if total length of sessions longer than 240 minutes then 45 points
			WHEN usl.length_minutes > 240
                THEN 45
            -- if total length of sessions longer than 180 minutes then 40 points
			WHEN usl.length_minutes > 180
                THEN 40
            -- if total length of sessions longer than 120 minutes then 30 points
			WHEN usl.length_minutes > 120
                THEN 30
            -- if total length of sessions longer than 60 minutes then 15 points
            WHEN usl.length_minutes > 60
                THEN 15
            -- if total length of sessions longer than 0 minutes then 10 points
            WHEN usl.length_minutes > 0
                THEN 10
            ELSE 0
        END total_session_length_points
	FROM user_session_lengths usl
),
engagement_points AS
(
	SELECT
		u.id user_id,
		(tslp.total_session_length_points
		+ sp.session_count_points
		+ sp.is_longer_than_fifteen_minutes_points
		+ sp.is_shorter_than_five_minutes_points
		+ COALESCE(uicv.inactive_course_count, 0) * -10::int)::int engagement_points
	FROM public.user u

	LEFT JOIN session_points sp
	ON sp.user_id = u.id

	LEFT JOIN total_session_length_points tslp
	ON tslp.user_id = u.id

	LEFT JOIN public.user_inactive_course_view uicv
	ON uicv.user_id = u.id
)

SELECT
	ep.user_id,
    CASE
		WHEN ep.engagement_points < 0
		THEN 0
		WHEN ep.engagement_points >= 0
		THEN ep.engagement_points
	END engagement_points
FROM engagement_points ep


