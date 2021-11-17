SELECT 
	"sq".*,
	"sq"."totalCorrectGivenAnswerCount"::double precision / "sq"."totalGivenAnswerCount" * 100 AS "totalCorrectAnswerRate",
	"sq"."successfulExamCount"::double precision / "sq"."completedExamCount" * 100 AS "totalSuccessfulExamRate"
FROM 
(
	SELECT 
		"u"."id" AS "userId",
		"u"."email" AS "userEmail",

		-- completed video count 
		(
			SELECT COUNT("vcv"."videoId")::int
			FROM public."video_completed_view" AS "vcv"
			WHERE "vcv"."userId" = "u"."id"
				AND "vcv"."isCompleted" = true
		) AS "completedVideoCount",

		-- completedExamCount
		(
			SELECT SUM ("ecv"."hasCompletedSession"::int)::int
			FROM public."exam_completed_view" AS "ecv"
			WHERE "ecv"."userId" = "u"."id"
		) AS "completedExamCount",

		-- completedExamCount
		(
			SELECT SUM ("ecv"."hasSuccessfulSession"::int)::int
			FROM public."exam_completed_view" AS "ecv"
			WHERE "ecv"."userId" = "u"."id"
		) AS "successfulExamCount",

		-- total watch time
		(
			SELECT SUM ("vpsv"."totalPlaybackDuration")::double precision
			FROM public."video_playback_sample_view" AS "vpsv"
			WHERE "vpsv"."userId" = "u"."id" 
		) AS "totalVideoPlaybackSeconds",

		-- total given answer count
		(
			SELECT COUNT ("ga"."id")::int 
			FROM public."given_answer" AS "ga"

			LEFT JOIN public."answer_session" AS "as"
			ON "as"."id" = "ga"."answerSessionId"

			LEFT JOIN public."question" AS "q"
			ON "q"."id" = "ga"."questionId"

			WHERE "as"."userId" = "u"."id" AND "q"."videoId" IS NOT NULL
		) AS "totalGivenAnswerCount",

		-- total correct given answer count
		(
			SELECT COUNT ("ga"."id")::int 
			FROM public."given_answer" AS "ga"

			LEFT JOIN public."answer_session" AS "as"
			ON "as"."id" = "ga"."answerSessionId"

			LEFT JOIN public."question" AS "q"
			ON "q"."id" = "ga"."questionId"

			WHERE "as"."userId" = "u"."id" 
				AND "q"."videoId" IS NOT NULL
				AND "ga"."isCorrect" = true 
		) AS "totalCorrectGivenAnswerCount",
	
		-- total session length 
		(
			SELECT SUM("usav"."sessionLengthSeconds")::int
			FROM public."user_session_view" AS "usav"
			
			WHERE "usav"."userId" = "u"."id"
		) AS "totalSessionLengthSeconds",
	
		-- avg session length
		(
			SELECT AVG("usav"."sessionLengthSeconds")::int
			FROM public."user_session_view" AS "usav"
			
			WHERE "usav"."userId" = "u"."id"
		) AS "averageSessionLengthSeconds",
	
		-- avg session success rate
		(
			SELECT AVG("essv"."correctAnswerRate")::int
			FROM public."exam_session_success_view" AS "essv"
			
			WHERE "essv"."userId" = "u"."id" 
				AND "essv"."answerSessionId" IS NOT NULL
				AND "essv"."isSignupAnswerSession" = false
		) AS "totalAnswerSessionSuccessRate"
	FROM public."user" AS "u"

	WHERE "u"."deletionDate" IS NULL AND "u"."isPendingInvitation" = false

	ORDER BY "u"."id"
) AS "sq"