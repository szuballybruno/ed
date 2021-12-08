SELECT 
	"sq".*,
	
	CASE WHEN "sq"."total_given_answer_count" = 0
		THEN 0
		ELSE  "sq"."total_correct_given_answer_count"::double precision / "sq"."total_given_answer_count" * 100 
	END AS "total_correct_answer_rate",
	
	CASE WHEN "sq"."completed_exam_count" = 0
		THEN 0
		ELSE "sq"."successful_exam_count"::double precision / "sq"."completed_exam_count" * 100 
	END AS "total_successful_exam_rate"
FROM 
(
	SELECT 
		"u"."id" AS "user_id",
		"u"."email" AS "user_email",

		-- completed video count 
		(
			SELECT COUNT("vcv"."video_id")::int
			FROM public."video_completed_view" AS "vcv"
			WHERE "vcv"."user_id" = "u"."id"
				AND "vcv"."is_completed" = true
		) AS "completed_video_count",

		-- completed_exam_count
		(
			SELECT SUM ("ecv"."has_completed_session"::int)::int
			FROM public."exam_completed_view" AS "ecv"
			WHERE "ecv"."user_id" = "u"."id"
		) AS "completed_exam_count",

		-- completed_exam_count
		(
			SELECT SUM ("ecv"."has_successful_session"::int)::int
			FROM public."exam_completed_view" AS "ecv"
			WHERE "ecv"."user_id" = "u"."id"
		) AS "successful_exam_count",

		-- total watch time
		(
			SELECT SUM ("vpsv"."total_playback_duration")::double precision
			FROM public."video_playback_sample_view" AS "vpsv"
			WHERE "vpsv"."user_id" = "u"."id" 
		) AS "total_video_playback_seconds",

		-- total given answer count
		(
			SELECT COUNT ("ga"."id")::int 
			FROM public."given_answer" AS "ga"

			LEFT JOIN public."answer_session" AS "as"
			ON "as"."id" = "ga"."answer_session_id"

			LEFT JOIN public."question" AS "q"
			ON "q"."id" = "ga"."question_id"

			WHERE "as"."user_id" = "u"."id" AND "q"."video_id" IS NOT NULL
		) AS "total_given_answer_count",

		-- total correct given answer count
		(
			SELECT COUNT ("ga"."id")::int 
			FROM public."given_answer" AS "ga"

			LEFT JOIN public."answer_session" AS "as"
			ON "as"."id" = "ga"."answer_session_id"

			LEFT JOIN public."question" AS "q"
			ON "q"."id" = "ga"."question_id"

			WHERE "as"."user_id" = "u"."id" 
				AND "q"."video_id" IS NOT NULL
				AND "ga"."is_correct" = true 
		) AS "total_correct_given_answer_count",
	
		-- total session length 
		(
			SELECT SUM("usav"."length_seconds")::int
			FROM public."user_session_view" AS "usav"
			
			WHERE "usav"."user_id" = "u"."id"
		) AS "total_session_length_seconds",
	
		-- avg session length
		(
			SELECT AVG("usav"."length_seconds")::int
			FROM public."user_session_view" AS "usav"
			
			WHERE "usav"."user_id" = "u"."id"
		) AS "average_session_length_seconds",
	
		-- avg session success rate
		(
			SELECT AVG("essv"."correct_answer_rate")::int
			FROM public."exam_session_success_view" AS "essv"
			
			WHERE "essv"."user_id" = "u"."id" 
				AND "essv"."answer_session_id" IS NOT NULL
				AND "essv"."is_signup_answer_session" = false
		) AS "total_answer_session_success_rate"
	FROM public."user" AS "u"

	WHERE "u"."deletion_date" IS NULL AND "u"."is_invitation_accepted" = true

	ORDER BY "u"."id"
) AS "sq"